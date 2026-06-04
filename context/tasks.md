# Happy3 — Improvement Tasks

> All tasks derived from the Architecture Analysis.
> Work through them in priority order (P0 → P4). Check off as completed.

---

## 🔴 P0 — Critical (Security & Data Integrity)

### Backend — Input Validation

- [x] Install `zod` in the backend
- [x] Create `dtos/question.dto.ts` — define `CreateQuestionSchema` and `UpdateQuestionSchema` with Zod
- [x] Create `dtos/option.dto.ts` — define `UpdateOptionsSchema` with Zod
- [x] Create `dtos/assessment.dto.ts` — define `SubmitAssessmentSchema` with Zod
- [x] Enhance existing `dtos/register.dto.ts` — add Zod schema with password strength rules (min 8 chars, etc.)
- [x] Enhance existing `dtos/login.dto.ts` — add Zod schema
- [x] Create `middlewares/validate.middleware.ts` — generic Zod validation middleware
- [x] Apply validation middleware to all routes in `question.route.ts`
- [x] Apply validation middleware to all routes in `option.route.ts`
- [x] Apply validation middleware to all routes in `assessment.route.ts`
- [x] Apply validation middleware to all routes in `auth.route.ts`
- [x] Remove all `any` types from service method parameters — use Zod-inferred types instead

### Backend — Security Hardcodes

- [x] Create `config/env.config.ts` — centralized environment config with Zod validation
- [x] Replace hardcoded `secure: false` in auth.controller.ts with `env.COOKIE_SECURE` (driven by `NODE_ENV`)
- [x] Replace hardcoded port `5000` in server.ts with `env.PORT`
- [x] Extract cookie configuration into a reusable `config/cookie.config.ts` helper (eliminate 3x duplication in auth.controller.ts)
- [x] Validate that all required env vars (`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `DATABASE_URL`) are present at startup

### Frontend — Security Hardcodes

- [x] Replace hardcoded `http://localhost:5000` in `StoreProvider.tsx` with `API_BASE` from `lib/api.ts`
- [x] Audit all files for any other hardcoded backend URLs — replace with `API_BASE`

### Backend — Rate Limiting

- [x] Install `express-rate-limit`
- [x] Add rate limiting middleware to `/api/auth/login` (e.g., 5 attempts per minute)
- [x] Add rate limiting middleware to `/api/auth/register`
- [x] Add general rate limiting middleware to all API routes (e.g., 100 req/min)

---

## 🟠 P1 — High Priority (Code Quality & Maintainability)

### Backend — Global Error Handling

- [x] Create `utils/errors.ts` — custom error class hierarchy (`AppError`, `NotFoundError`, `ValidationError`, `UnauthorizedError`, `ConflictError`)
- [x] Create `middlewares/error.middleware.ts` — global error handler middleware
- [x] Create `utils/asyncHandler.ts` — wrapper to catch async errors and forward to error middleware
- [x] Register global error handler in `app.ts` (after all routes)
- [x] Refactor `auth.controller.ts` — remove try/catch, use `asyncHandler` + custom errors
- [x] Refactor `question.controller.ts` — remove try/catch, use `asyncHandler` + custom errors
- [x] Refactor `option.controller.ts` — remove try/catch, use `asyncHandler` + custom errors
- [x] Refactor `assessment.controller.ts` — remove try/catch, use `asyncHandler` + custom errors
- [x] Update services to throw custom `AppError` subclasses instead of generic `new Error()`

### Frontend — Break Up God Components

- [x] Analyze `admin/assessment/page.tsx` (29KB) — identify distinct responsibilities
- [x] Extract `QuestionList.tsx` component — table/list rendering of questions
- [x] Extract `QuestionForm.tsx` component — create/edit question form
- [x] Extract `OptionEditor.tsx` component — options management UI
- [x] Extract `SubmissionViewer.tsx` component — view submission details
- [x] Create `hooks/useQuestions.ts` — encapsulate question CRUD fetch logic
- [x] Create `hooks/useAssessmentForm.ts` — encapsulate form state logic
- [x] Refactor `admin/assessment/page.tsx` to compose the extracted components (target < 100 lines)

### Frontend — Fix Middleware File

- [x] Rename `src/proxy.ts` to `src/middleware.ts` (correct Next.js convention)
- [x] Verify middleware is properly detected by Next.js after rename
- [x] Update `config.matcher` if needed

---

## 🟡 P2 — Medium Priority (Architecture & Testability)

### Backend — Dependency Injection

- [ ] Create `interfaces/IAuthRepository.ts` — interface for auth repository
- [ ] Create `interfaces/IQuestionRepository.ts` — interface for question repository
- [ ] Create `interfaces/IOptionRepository.ts` — interface for option repository
- [ ] Create `interfaces/IAssessmentRepository.ts` — interface for assessment repository
- [ ] Make each repository class implement its corresponding interface
- [ ] Refactor `AuthService` — accept `IAuthRepository` via constructor injection
- [ ] Refactor `QuestionService` — accept `IQuestionRepository` + `IOptionRepository` via constructor injection
- [ ] Refactor `OptionService` — accept `IQuestionRepository` + `IOptionRepository` via constructor injection
- [ ] Refactor `AssessmentService` — accept `IAssessmentRepository` via constructor injection
- [ ] Create a composition root / factory (`config/container.ts`) to wire dependencies
- [ ] Update controllers to receive services from the composition root
- [ ] Update route files to use the wired controllers

### Backend — RESTful URL Refactoring

- [ ] Refactor `question.route.ts` — change URLs to RESTful nouns:
  - `POST /createQuestion` → `POST /`
  - `GET /getAllQuestions` → `GET /`
  - `PUT /updateQuestion/:id` → `PUT /:id`
  - `DELETE /deleteQuestion/:id` → `DELETE /:id`
- [ ] Refactor `option.route.ts` — change URLs to RESTful nouns:
  - `PUT /updateOptions/:questionId` → `PUT /:questionId`
  - `DELETE /deleteOptions/:questionId` → `DELETE /:questionId`
- [ ] Refactor `assessment.route.ts` — change URLs to RESTful nouns:
  - `POST /submit` → `POST /`
  - `GET /submissions` → `GET /`
  - `GET /submission/:id` → `GET /:id`
- [ ] Update all frontend API calls in `lib/api/assessment.ts` to match new URLs
- [ ] Update any other frontend files referencing old API URLs

### Backend — DTOs for All Entities

- [ ] Create DTOs for Question operations (beyond just Zod — typed request/response shapes)
- [ ] Create DTOs for Option operations
- [ ] Create DTOs for Assessment operations
- [ ] Ensure services never return raw Prisma models — map to response DTOs

### Database Schema Improvements

- [ ] Add unique constraint on `Question.questionNo` in `schema.prisma`
- [ ] Change `User.role` from `String` to an enum (`enum Role { ADMIN USER }`)
- [ ] Consider normalizing `AssessmentSubmission.answers` — create an `Answer` model with proper foreign keys to `Question` and `Option`
- [ ] Add optional `userId` foreign key to `AssessmentSubmission` for tracking authenticated submissions
- [ ] Run `prisma migrate dev` after schema changes

---

## 🟢 P3 — Nice to Have (Performance & DX)

### Frontend — React Query for Data Fetching

- [ ] Install `@tanstack/react-query`
- [ ] Create `providers/QueryProvider.tsx` — wrap app with `QueryClientProvider`
- [ ] Create `hooks/useQuestions.ts` — `useQuery` for fetching questions
- [ ] Create `hooks/useCreateQuestion.ts` — `useMutation` for creating questions
- [ ] Create `hooks/useUpdateQuestion.ts` — `useMutation` for updating questions
- [ ] Create `hooks/useDeleteQuestion.ts` — `useMutation` for deleting questions
- [ ] Create `hooks/useSubmissions.ts` — `useQuery` for fetching submissions
- [ ] Refactor assessment admin page to use React Query hooks
- [ ] Remove manual `useEffect` + `useState` fetch patterns

### Frontend — Replace Redux with Lighter Solution

- [ ] Evaluate options: Zustand vs React Context for auth-only state
- [ ] If Zustand: install `zustand`, create `store/auth.ts`
- [ ] If Context: create `contexts/AuthContext.tsx` with provider
- [ ] Migrate `StoreProvider.tsx` auth initialization logic to new solution
- [ ] Remove `@reduxjs/toolkit` and `react-redux` dependencies
- [ ] Remove `lib/store/` directory
- [ ] Update `layout.tsx` to use new provider

### Frontend — API Client with Interceptors

- [ ] Create `lib/api/client.ts` — centralized fetch wrapper class
- [ ] Add auto `credentials: "include"` for all requests
- [ ] Add auto 401 → refresh token → retry logic
- [ ] Add response normalization (extract `.data` from `{ success, data }`)
- [ ] Refactor `lib/api/assessment.ts` to use the new API client
- [ ] Create API modules for other entities as needed

### Frontend — Error Boundaries

- [ ] Create `components/ErrorBoundary.tsx` — generic error boundary
- [ ] Create `app/error.tsx` — Next.js root error page
- [ ] Create `app/admin/error.tsx` — admin-specific error page
- [ ] Create `app/not-found.tsx` — custom 404 page
- [ ] Wrap critical sections with error boundaries

### Backend — Structured Logging

- [ ] Install `pino` + `pino-pretty` (dev)
- [ ] Create `utils/logger.ts` — configured pino logger
- [ ] Replace all `console.log` calls with `logger.info`
- [ ] Replace all `console.error` calls with `logger.error`
- [ ] Add request logging middleware (log method, URL, status, duration)

---

## 🔵 P4 — Future Enhancements

### Backend — API Versioning

- [ ] Create `routes/v1/` directory
- [ ] Move all current routes into `routes/v1/`
- [ ] Update `app.ts` to mount at `/api/v1/...`
- [ ] Update frontend `API_BASE` or API functions to use `/api/v1/`

### Backend — Testing

- [ ] Install `vitest` (or `jest`) + `supertest`
- [ ] Configure test scripts in `package.json`
- [ ] Write unit tests for `auth.service.ts` (mock repository)
- [ ] Write unit tests for `question.service.ts` (mock repository)
- [ ] Write unit tests for `option.service.ts` (mock repository)
- [ ] Write unit tests for `assessment.service.ts` (mock repository)
- [ ] Write integration tests for auth API endpoints (register, login, refresh, logout)
- [ ] Write integration tests for question CRUD API endpoints
- [ ] Write integration tests for assessment submission API endpoint
- [ ] Add schema validation tests for all Zod DTOs

### Frontend — Testing

- [ ] Install testing framework (`vitest` + `@testing-library/react`)
- [ ] Write unit tests for `authSlice` reducers
- [ ] Write unit tests for API functions (`lib/api/assessment.ts`)
- [ ] Write component tests for critical UI components
- [ ] Write integration tests for assessment flow

### Backend — Auth Enhancements

- [ ] Add `authMiddleware` to all question/option/assessment admin routes
- [ ] Implement role-based access control (RBAC) — check `user.role` in middleware
- [ ] Add password strength validation in register endpoint
- [ ] Add account lockout after N failed login attempts
- [ ] Add CSRF protection for cookie-based auth

### Frontend — Accessibility & SEO

- [ ] Audit all pages for proper heading hierarchy (single `<h1>` per page)
- [ ] Add `aria-label` attributes to icon-only buttons
- [ ] Ensure all form inputs have associated `<label>` elements
- [ ] Add `<meta>` descriptions to all pages (not just root layout)
- [ ] Test keyboard navigation flow through assessment quiz

### DevOps & CI/CD

- [ ] Create `.env.example` files for both backend and frontend
- [ ] Add ESLint config to backend
- [ ] Add Prettier config (shared across frontend + backend)
- [ ] Set up GitHub Actions CI pipeline (lint, type-check, test)
- [ ] Add Docker Compose for local development (backend + PostgreSQL)
- [ ] Add production Dockerfile for backend

---

## 📝 Notes

- Always complete P0 tasks before moving to P1, etc.
- After each task, verify the application still runs correctly.
- Backend and frontend tasks within the same priority can be worked on in parallel.
- Schema changes (P2) should be done carefully — they require migration and may affect existing data.
