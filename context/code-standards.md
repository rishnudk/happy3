# Happy3 — Coding Standards

> This document defines the coding standards, conventions, and folder structures for both the backend and frontend of the Happy3 project. All new code and refactored code must follow these standards.

---

## Table of Contents

1. [General Standards (Both)](#1-general-standards-both)
2. [Backend Coding Standards](#2-backend-coding-standards)
3. [Backend Folder Structure](#3-backend-folder-structure)
4. [Frontend Coding Standards](#4-frontend-coding-standards)
5. [Frontend Folder Structure](#5-frontend-folder-structure)
6. [Naming Conventions](#6-naming-conventions)
7. [Git Conventions](#7-git-conventions)

---

## 1. General Standards (Both)

### 1.1 TypeScript Rules

- **No `any` types.** Use proper types, generics, or `unknown` with type guards.
- **Enable `strict: true`** in all `tsconfig.json` files.
- **Prefer `interface` over `type`** for object shapes (extensible).
- **Use `type` for unions, intersections, and utility types.**
- **All function parameters and return types must be explicitly typed** (no implicit `any`).
- **Use `readonly` for properties that should not be mutated.**
- **Use `as const` for literal constants.**

```typescript
// ✅ Good
interface User {
  readonly id: number;
  username: string;
  role: UserRole;
}

// ❌ Bad
const handleData = (data: any) => { ... }
```

### 1.2 Formatting & Linting

- Use **Prettier** for formatting (consistent across all files).
- Use **ESLint** with recommended TypeScript rules.
- **Max line length**: 100 characters (soft limit, Prettier handles wrapping).
- **Indent**: 2 spaces (no tabs).
- **Semicolons**: Required.
- **Quotes**: Double quotes for strings.
- **Trailing commas**: Always (ES5+).

### 1.3 Comments

- **Don't comment obvious code.** Code should be self-documenting.
- **Do comment** the *why*, not the *what*.
- Use `/** JSDoc */` for public APIs, exported functions, and interfaces.
- Use `// TODO:` for planned improvements.
- Use `// FIXME:` for known bugs.
- Remove commented-out code — use git history instead.

```typescript
// ❌ Bad — states the obvious
// Increment counter by 1
counter++;

// ✅ Good — explains why
// Retry count includes the initial attempt, so start at 1
counter++;
```

### 1.4 Error Handling

- **Never swallow errors silently** (empty `catch {}` blocks).
- **Always log unexpected errors** with the full error object.
- **Prefer custom error classes** over generic `new Error()`.
- **Catch only what you can handle** — let the rest propagate.

### 1.5 Environment Variables

- Never commit `.env` files.
- Always provide `.env.example` with placeholder values.
- Validate all environment variables at startup with Zod.
- Access env vars through a centralized config module — never `process.env.X` inline.

---

## 2. Backend Coding Standards

### 2.1 Architecture — Layered Pattern

All backend code must follow a strict **4-layer architecture**:

```
Route → Controller → Service → Repository → Database
```

| Layer | Responsibility | Allowed Imports |
|---|---|---|
| **Route** | HTTP verb + URL mapping only | Controller, Middleware |
| **Controller** | Parse input, call service, format HTTP response | Service, DTOs |
| **Service** | Business logic, orchestration, validation | Repository (via interface), DTOs, Utils |
| **Repository** | Database queries only | Prisma Client, DTOs |

**Rules:**
- **Controllers must NOT contain business logic.** They parse, delegate, and respond.
- **Services must NOT import Prisma directly.** Always go through a repository.
- **Repositories must NOT throw business errors.** They only throw data-access errors.
- **Routes must NOT contain inline handler functions.** Always reference a controller method.

### 2.2 Dependency Injection

- **Services receive dependencies via constructor injection.**
- **Define interfaces for all repositories** — services depend on interfaces, not concrete classes.
- **Wire dependencies in a composition root** (`config/container.ts`), never in route files.

```typescript
// ✅ Good — constructor injection
export class QuestionService {
  constructor(
    private readonly questionRepo: IQuestionRepository,
    private readonly optionRepo: IOptionRepository,
  ) {}
}

// ❌ Bad — module-level instantiation (tight coupling)
const questionRepo = new QuestionRepository();
```

### 2.3 DTOs & Validation

- **Every API endpoint must have a defined DTO schema** (using Zod).
- **DTOs live in the `dtos/` directory**, one file per entity.
- **Each DTO file exports**: Zod schema + inferred TypeScript type.
- **Validation happens in middleware** (before the controller is called).
- **Services accept DTO types**, never raw `req.body`.

```typescript
// dtos/question.dto.ts
import { z } from "zod";

export const CreateQuestionSchema = z.object({
  questionNo: z.number().int().positive(),
  category: z.string().min(1).max(100),
  questionText: z.string().min(1).max(2000),
  options: z.array(z.object({
    optionText: z.string().min(1),
    mark: z.number().int().min(0).max(10),
  })).min(2),
});

export type CreateQuestionDTO = z.infer<typeof CreateQuestionSchema>;
```

### 2.4 Error Handling

- Use a **custom error class hierarchy** rooted in `AppError`.
- **Every error must have**: HTTP status code, human-readable message, operational flag.
- **Controllers do NOT use try/catch** — wrap with `asyncHandler`.
- **Global error handler middleware** catches all errors and formats the response.

```typescript
// Error class hierarchy
AppError (base)
├── ValidationError (400)
├── UnauthorizedError (401)
├── ForbiddenError (403)
├── NotFoundError (404)
└── ConflictError (409)
```

### 2.5 REST API Design

- **URLs are nouns**, HTTP methods are verbs. Never put verbs in URLs.
- **Use plural resource names**: `/api/v1/questions`, not `/api/v1/question`.
- **Nest sub-resources**: `/api/v1/questions/:id/options`.
- **Use proper HTTP status codes**.
- **Version all APIs**: `/api/v1/...`.

| Action | HTTP Method | URL Pattern | Status Code |
|---|---|---|---|
| Create | `POST` | `/api/v1/questions` | `201 Created` |
| List all | `GET` | `/api/v1/questions` | `200 OK` |
| Get one | `GET` | `/api/v1/questions/:id` | `200 OK` |
| Update | `PUT` | `/api/v1/questions/:id` | `200 OK` |
| Delete | `DELETE` | `/api/v1/questions/:id` | `204 No Content` |

### 2.6 API Response Format

All API responses must follow this consistent shape:

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "total": 42, "page": 1, "limit": 20 } // optional, for lists
}

// Error
{
  "success": false,
  "message": "Human-readable error description",
  "errors": { "field": ["error detail"] }  // optional, for validation
}
```

### 2.7 Database & Prisma

- **Never call Prisma outside of repository files.**
- **Use a single Prisma instance** (singleton via `db.config.ts`).
- **Use database transactions** for multi-step writes (e.g., creating a question + options).
- **Prefer soft deletes** (`isDeleted` flag) over hard deletes for auditable entities.
- **Use enums** for fixed-set fields (e.g., `Role`, `Category`).
- **All schema changes require a named migration**: `prisma migrate dev --name descriptive_name`.

### 2.8 Authentication & Security

- **All admin routes must be protected** by `authMiddleware`.
- **Cookie config is centralized** — never inline cookie options in controllers.
- **`secure` flag must be driven by `NODE_ENV`**, never hardcoded.
- **Refresh token rotation**: always issue a new refresh token on `/refresh`.
- **Rate limiting** on auth endpoints (login, register).
- **Never log sensitive data** (passwords, tokens, secrets).

### 2.9 Logging

- Use a **structured logging library** (pino recommended).
- **Log levels**: `error`, `warn`, `info`, `debug`, `trace`.
- **Every incoming request** should be logged with: method, URL, status code, duration.
- **Never use `console.log` or `console.error`** — always use the logger.

---

## 3. Backend Folder Structure

```
backend/
├── .env                          # Environment variables (git-ignored)
├── .env.example                  # Template with placeholder values
├── .gitignore
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Prisma migration files
├── prisma.config.ts
└── src/
    ├── server.ts                 # Entry point (dotenv, DB connect, listen)
    ├── app.ts                    # Express app (middleware, route mounting)
    │
    ├── config/                   # ── Configuration ──
    │   ├── env.config.ts         # Zod-validated environment variables
    │   ├── db.config.ts          # Prisma client singleton
    │   ├── cookie.config.ts      # Centralized cookie settings
    │   └── container.ts          # Dependency injection wiring (composition root)
    │
    ├── interfaces/               # ── Abstractions ──
    │   ├── IAuthRepository.ts
    │   ├── IQuestionRepository.ts
    │   ├── IOptionRepository.ts
    │   └── IAssessmentRepository.ts
    │
    ├── dtos/                     # ── Data Transfer Objects ──
    │   ├── auth.dto.ts           # LoginSchema, RegisterSchema + types
    │   ├── question.dto.ts       # CreateQuestionSchema, UpdateQuestionSchema + types
    │   ├── option.dto.ts         # UpdateOptionsSchema + types
    │   └── assessment.dto.ts     # SubmitAssessmentSchema + types
    │
    ├── routes/                   # ── Route Definitions ──
    │   └── v1/                   # API version 1
    │       ├── index.ts          # Aggregates all v1 routes
    │       ├── auth.route.ts
    │       ├── question.route.ts
    │       ├── option.route.ts
    │       └── assessment.route.ts
    │
    ├── controllers/              # ── HTTP Controllers ──
    │   ├── auth.controller.ts
    │   ├── question.controller.ts
    │   ├── option.controller.ts
    │   └── assessment.controller.ts
    │
    ├── services/                 # ── Business Logic ──
    │   ├── auth.service.ts
    │   ├── question.service.ts
    │   ├── option.service.ts
    │   └── assessment.service.ts
    │
    ├── repositories/             # ── Data Access ──
    │   ├── auth.repository.ts
    │   ├── question.repository.ts
    │   ├── option.repository.ts
    │   └── assessment.repository.ts
    │
    ├── middlewares/               # ── Middleware ──
    │   ├── auth.middleware.ts     # JWT verification
    │   ├── validate.middleware.ts # Zod schema validation
    │   ├── error.middleware.ts    # Global error handler
    │   └── rateLimiter.middleware.ts # Rate limiting
    │
    ├── utils/                    # ── Utilities ──
    │   ├── jwt.ts                # Token generation & verification
    │   ├── logger.ts             # Pino logger instance
    │   ├── errors.ts             # Custom error classes (AppError, NotFoundError, etc.)
    │   └── asyncHandler.ts       # Async route handler wrapper
    │
    └── __tests__/                # ── Tests ──
        ├── unit/
        │   ├── services/
        │   │   ├── auth.service.test.ts
        │   │   ├── question.service.test.ts
        │   │   ├── option.service.test.ts
        │   │   └── assessment.service.test.ts
        │   └── dtos/
        │       ├── auth.dto.test.ts
        │       └── question.dto.test.ts
        ├── integration/
        │   ├── auth.api.test.ts
        │   ├── question.api.test.ts
        │   └── assessment.api.test.ts
        └── helpers/
            └── testDb.ts         # Test database setup/teardown
```

### Key Differences from Current Structure

| Current | Standard | Why |
|---|---|---|
| `controller/` | `controllers/` | Consistent plural naming |
| `service/` | `services/` | Consistent plural naming |
| `routes/` (flat) | `routes/v1/` | API versioning |
| No `interfaces/` | `interfaces/` | Dependency inversion |
| 2 DTO files (auth only) | `dtos/` (all entities) | Complete validation |
| No `__tests__/` | `__tests__/unit/` + `integration/` | Testing infrastructure |
| No `config/container.ts` | `config/container.ts` | Dependency injection wiring |
| No error utilities | `utils/errors.ts` + `utils/asyncHandler.ts` | Centralized error handling |

---

## 4. Frontend Coding Standards

### 4.1 Component Architecture

- **One component per file.** File name matches component name.
- **Max component size: ~200 lines.** If larger, split into sub-components.
- **Use functional components only** — no class components (except ErrorBoundary).
- **Colocate related files** — a component's hooks, types, and styles live near it.

### 4.2 File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| React Components | `PascalCase.tsx` | `QuestionForm.tsx` |
| Hooks | `camelCase.ts` (prefixed with `use`) | `useQuestions.ts` |
| Utilities | `camelCase.ts` | `formatDate.ts` |
| Types/Interfaces | `camelCase.ts` | `assessment.ts` |
| Constants | `camelCase.ts` or `SCREAMING_SNAKE` for values | `routes.ts` |
| CSS Modules | `kebab-case.module.css` | `question-form.module.css` |
| Test Files | `*.test.tsx` or `*.spec.tsx` | `QuestionForm.test.tsx` |

### 4.3 Component Structure

Every component file should follow this internal order:

```typescript
// 1. Imports (external → internal → styles → types)
import { useState } from "react";                    // External
import { Button } from "@/components/ui/button";      // Internal
import styles from "./Component.module.css";          // Styles
import type { QuestionProps } from "./types";         // Types

// 2. Type definitions (if not in separate file)
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

// 3. Constants (component-specific)
const MAX_OPTIONS = 5;

// 4. Component definition
export function QuestionForm({ title, onSubmit }: Props) {
  // a. State
  const [value, setValue] = useState("");
  
  // b. Derived state / computed values
  const isValid = value.length > 0;
  
  // c. Effects
  useEffect(() => { ... }, []);
  
  // d. Event handlers
  const handleSubmit = () => { ... };
  
  // e. Render
  return ( ... );
}
```

### 4.4 State Management

- **Server state** (data from APIs): Use **React Query** (`@tanstack/react-query`).
  - All data fetching, caching, invalidation, and mutation through React Query hooks.
  - No manual `useEffect` + `useState` for API calls.
- **Client state** (UI state, forms): Use **React's built-in hooks** (`useState`, `useReducer`).
- **Global client state** (auth, theme): Use **Zustand** or **React Context**.
  - Redux is only acceptable if there are 3+ complex, interconnected slices.
- **URL state** (filters, pagination): Use **URL search params** via Next.js.

### 4.5 Data Fetching

- **All API calls must go through the centralized API client** (`lib/api/client.ts`).
- **Never call `fetch()` directly in components.**
- **API functions live in `lib/api/`**, one file per entity.
- **Use React Query hooks** in components — not raw API functions.

```typescript
// ✅ Good — API function in lib/api/, used via React Query hook
// lib/api/questions.ts
export const fetchQuestions = () => api.get<Question[]>("/api/v1/questions");

// hooks/useQuestions.ts
export const useQuestions = () => useQuery({ queryKey: ["questions"], queryFn: fetchQuestions });

// Component
function QuestionList() {
  const { data, isLoading, error } = useQuestions();
}

// ❌ Bad — fetch directly in component
function QuestionList() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch("/api/...").then(r => r.json()).then(setData); }, []);
}
```

### 4.6 Styling

- **Use Tailwind CSS** as the primary styling method.
- **Use `cn()` utility** (from `lib/utils.ts`) for conditional class merging.
- **Component-scoped CSS** (in `styles/`) for complex animations or overrides only.
- **No inline `style={}` objects** except for truly dynamic values (e.g., computed positions).
- **shadcn/ui components** are the base — extend them, don't reinvent.

### 4.7 Error Handling

- **Wrap page layouts with Error Boundaries.**
- **Use Next.js `error.tsx` convention** for route-level error handling.
- **Display user-friendly error messages** — never show raw error stacks.
- **Toast notifications** (via Sonner) for transient errors (API failures, validation).
- **Inline error messages** for form validation.

### 4.8 Next.js Conventions

- **Use the App Router** (not Pages Router).
- **Use Server Components by default** — add `"use client"` only when needed.
- **Middleware** must be in `src/middleware.ts` (not `proxy.ts` or any other name).
- **Page files** should be thin — they compose components, not contain logic.
- **Loading states**: Use `loading.tsx` convention per route.
- **Metadata**: Define `metadata` export in every `page.tsx` and `layout.tsx`.

### 4.9 Imports

- **Use path aliases** (`@/` prefix) — never relative paths like `../../`.
- **Order imports** consistently:
  1. React / Next.js
  2. External libraries
  3. Internal modules (`@/components/`, `@/lib/`, etc.)
  4. Types (with `import type`)
  5. Styles

### 4.10 Performance

- **Use `React.memo()`** for expensive components that receive stable props.
- **Use `useMemo()` / `useCallback()`** only when there's a measured performance issue — don't premature-optimize.
- **Lazy-load heavy components** (`next/dynamic` or `React.lazy`).
- **Optimize images** with `next/image` — always specify `width` and `height`.
- **Keep bundle size in check** — audit with `next build` output.

---

## 5. Frontend Folder Structure

```
frontend/
├── .env.local                    # Environment variables (git-ignored)
├── .env.example                  # Template with placeholder values
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json               # shadcn/ui config
├── public/
│   ├── home/                     # Landing page assets
│   │   ├── logo.svg
│   │   └── ...
│   └── favicon.ico
└── src/
    ├── middleware.ts              # Next.js middleware (auth guard, redirects)
    │
    ├── app/                      # ── Next.js App Router Pages ──
    │   ├── layout.tsx            # Root layout (fonts, providers, globals)
    │   ├── page.tsx              # Landing page
    │   ├── globals.css           # Global styles + Tailwind
    │   ├── error.tsx             # Root error boundary
    │   ├── not-found.tsx         # 404 page
    │   ├── loading.tsx           # Root loading skeleton
    │   │
    │   ├── assessment/           # Public assessment quiz
    │   │   ├── page.tsx
    │   │   ├── loading.tsx
    │   │   └── error.tsx
    │   │
    │   ├── admin/                # Admin panel
    │   │   ├── layout.tsx        # Admin layout (sidebar, theme)
    │   │   ├── page.tsx          # Dashboard overview
    │   │   ├── loading.tsx
    │   │   ├── error.tsx
    │   │   └── assessment/       # Assessment management
    │   │       ├── page.tsx      # Thin page shell (< 100 lines)
    │   │       ├── loading.tsx
    │   │       └── components/   # Page-scoped components
    │   │           ├── QuestionList.tsx
    │   │           ├── QuestionForm.tsx
    │   │           ├── QuestionRow.tsx
    │   │           ├── OptionEditor.tsx
    │   │           └── SubmissionViewer.tsx
    │   │
    │   ├── community/
    │   │   └── page.tsx
    │   └── programs/
    │       └── page.tsx
    │
    ├── components/               # ── Shared Components ──
    │   ├── ui/                   # shadcn/ui primitives (auto-generated)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   └── ...
    │   │
    │   ├── layout/               # App-wide layout components
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ScrollProgress.tsx
    │   │   └── PageWrapper.tsx
    │   │
    │   ├── sections/             # Landing page sections
    │   │   ├── Hero.tsx
    │   │   ├── ChallengeSection.tsx
    │   │   ├── PillarsSection.tsx
    │   │   ├── ProgramsSection.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   ├── CommunitySection.tsx
    │   │   ├── CtaSection.tsx
    │   │   └── GlobalBackground.tsx
    │   │
    │   ├── admin/                # Admin-specific shared components
    │   │   ├── ThemeToggle.tsx
    │   │   ├── AppSidebar.tsx
    │   │   ├── SiteHeader.tsx
    │   │   └── SectionCards.tsx
    │   │
    │   ├── assessment/           # Assessment flow components
    │   │   └── AssessmentFlow.tsx
    │   │
    │   ├── shared/               # Cross-feature shared components
    │   │   ├── SectionTitle.tsx
    │   │   ├── SocialIcons.tsx
    │   │   ├── FloatingBadge.tsx
    │   │   └── ErrorBoundary.tsx
    │   │
    │   └── motion/               # Animation wrappers
    │       └── ...
    │
    ├── hooks/                    # ── Custom Hooks ──
    │   ├── use-mobile.ts         # Responsive breakpoint hook
    │   ├── useQuestions.ts       # React Query: questions CRUD
    │   ├── useSubmissions.ts     # React Query: submissions
    │   └── useAuth.ts           # Auth state hook
    │
    ├── lib/                      # ── Core Libraries ──
    │   ├── utils.ts              # cn() and other utilities
    │   │
    │   ├── api/                  # API communication layer
    │   │   ├── client.ts         # Centralized fetch wrapper (interceptors, auth refresh)
    │   │   ├── questions.ts      # Question API functions
    │   │   ├── options.ts        # Option API functions
    │   │   ├── assessment.ts     # Assessment API functions
    │   │   └── auth.ts           # Auth API functions
    │   │
    │   └── store/                # Global client state (auth)
    │       └── auth.ts           # Zustand store or Context (replaces Redux)
    │
    ├── providers/                # ── Context Providers ──
    │   ├── QueryProvider.tsx     # React Query provider
    │   ├── AuthProvider.tsx      # Auth state provider
    │   └── ThemeProvider.tsx     # Theme provider (wraps next-themes)
    │
    ├── types/                    # ── TypeScript Types ──
    │   ├── assessment.ts         # Question, Option, Submission types
    │   ├── auth.ts               # User, AuthState types
    │   └── api.ts                # ApiResponse, ApiError types
    │
    ├── constants/                # ── Application Constants ──
    │   ├── routes.ts             # Route path constants
    │   └── config.ts             # App config constants (API_BASE, etc.)
    │
    ├── styles/                   # ── Custom CSS ──
    │   ├── admin.css             # Admin-scoped overrides
    │   ├── background.css        # Animated backgrounds
    │   ├── animations.css        # Keyframe animations
    │   ├── gradients.css         # Gradient utilities
    │   └── shadows.css           # Shadow utilities
    │
    └── __tests__/                # ── Tests ──
        ├── components/
        │   └── QuestionForm.test.tsx
        ├── hooks/
        │   └── useQuestions.test.ts
        └── lib/
            └── api/
                └── questions.test.ts
```

### Key Differences from Current Structure

| Current | Standard | Why |
|---|---|---|
| `proxy.ts` | `middleware.ts` | Next.js requires this exact name |
| `lib/store/` (Redux) | `lib/store/auth.ts` (Zustand) or `providers/AuthProvider.tsx` | Simpler for auth-only state |
| No `providers/` | `providers/` | Clean separation of context providers |
| No `__tests__/` | `__tests__/` | Testing infrastructure |
| No `constants/` (empty) | `constants/routes.ts`, `constants/config.ts` | Centralized magic values |
| No `hooks/useQuestions.ts` | `hooks/useQuestions.ts` | React Query hooks for data fetching |
| No `lib/api/client.ts` | `lib/api/client.ts` | Centralized HTTP with interceptors |
| No `error.tsx` files | `error.tsx` per route segment | Error boundaries |
| No `loading.tsx` files | `loading.tsx` per route segment | Loading skeletons |
| 29KB admin assessment page | `page.tsx` + `components/` subdirectory | Components < 200 lines each |

---

## 6. Naming Conventions

### 6.1 Files & Directories

| Item | Convention | Example |
|---|---|---|
| React components | PascalCase | `QuestionForm.tsx` |
| Hooks | camelCase with `use` prefix | `useQuestions.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants files | camelCase | `routes.ts` |
| Type/Interface files | camelCase | `assessment.ts` |
| Backend modules | kebab-case with dot separator | `auth.controller.ts` |
| Directories | kebab-case | `components/shared/` |
| Test files | Same name + `.test` suffix | `auth.service.test.ts` |

### 6.2 Code Identifiers

| Item | Convention | Example |
|---|---|---|
| Variables | camelCase | `totalScore` |
| Constants (config) | camelCase | `maxRetries` |
| Constants (enum-like) | SCREAMING_SNAKE_CASE | `MAX_LOGIN_ATTEMPTS` |
| Functions | camelCase | `fetchQuestions()` |
| React components | PascalCase | `QuestionForm` |
| Interfaces | PascalCase with `I` prefix (backend only) | `IQuestionRepository` |
| Types | PascalCase | `CreateQuestionDTO` |
| Enums | PascalCase (name) + PascalCase (members) | `enum UserRole { Admin, User }` |
| Boolean vars | `is`/`has`/`should` prefix | `isLoading`, `hasError` |

### 6.3 API & Database

| Item | Convention | Example |
|---|---|---|
| API URLs | kebab-case, plural nouns | `/api/v1/questions` |
| API query params | camelCase | `?pageSize=20&sortBy=createdAt` |
| DB table names | PascalCase (Prisma convention) | `AssessmentSubmission` |
| DB columns | camelCase (Prisma convention) | `questionText` |
| DB enums | SCREAMING_SNAKE_CASE | `ADMIN`, `USER` |

---

## 7. Git Conventions

### 7.1 Commit Messages

Use **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

| Type | When to Use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, configs |
| `perf` | Performance improvement |

```
feat(backend): add Zod validation to question endpoints
fix(frontend): replace hardcoded API URL with API_BASE constant
refactor(backend): extract cookie config into reusable helper
test(backend): add unit tests for question service
```

### 7.2 Branch Naming

```
<type>/<short-description>

feat/add-question-validation
fix/hardcoded-api-url
refactor/dependency-injection
```

### 7.3 Files That Must Be Git-Ignored

```
.env
.env.local
node_modules/
dist/
.next/
*.log
```
