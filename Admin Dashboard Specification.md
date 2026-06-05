# Happiness Coaching Academy

# Admin Dashboard Specification

## Design System

Use the existing Admin Dashboard Design System without modification.

Maintain:

* Typography
* Colors
* Border radius
* Card styling
* Sidebar layout
* Navigation
* Light mode
* Dark mode
* Hover states
* Responsive behavior

The only changes are dashboard content, widgets, charts, and data structures.

---

# Dashboard Layout

```txt

            ┌───────────────────────────────────────────────┐
            │ Greeting Header                               │
            ├───────────────────────────────────────────────┤
            │ Active Students │ Enrollments │ Sessions │ Revenue
            ├───────────────────────────────────────────────┤
            │ Student Growth Chart                          │
            ├───────────────────────┬───────────────────────┤
sidebar     │ Program Performance   │ Enrollment Funnel     │
            ├───────────────────────┴───────────────────────┤
            │ Upcoming Sessions                             │
            ├───────────────────────────────────────────────┤
            │ Recent Enrollments                            │
            ├───────────────────────┬───────────────────────┤
            │ Coach Performance     │ Notifications         │
            └───────────────────────┴───────────────────────┘
```

---

# Header

```txt
Good afternoon, Shabna 👋
notification Icon
darkmode toggle
profile icon

```

---

# Primary KPI Cards

## Card 1

Title

```txt
Active Students
```

Value

```txt
1,284
```

Growth

```txt
+12.4%
```

Description

```txt
Students currently enrolled
```

Icon

```txt
Users
```

---

## Card 2

Title

```txt
New Enrollments
```

Value

```txt
146
```

Growth

```txt
+18.7%
```

Description

```txt
Joined this month
```

Icon

```txt
GraduationCap
```

---

## Card 3

Title

```txt
Upcoming Sessions
```

Value

```txt
28
```

Growth

```txt
6 Today
```

Description

```txt
Scheduled coaching sessions
```

Icon

```txt
Calendar
```

---

## Card 4

Title

```txt
Monthly Revenue
```

Value

```txt
₹12,45,000
```

Growth

```txt
+18.2%
```

Description

```txt
Course sales and coaching fees
```

Icon

```txt
IndianRupee
```

---

# Quick Actions

Buttons

```txt
+ Add Student

+ Schedule Session

+ Add Lead

+ Create Program

+ Generate Report
```

Primary Action

```txt
+ Add Student
```

---

# Student Growth Chart

Title

```txt
Student Growth & Enrollment Trends
```

Description

```txt
Track academy growth across enrollments and active students.
```

Chart Type

```txt
Multi Line Chart
```

Datasets

```txt
Active Students

New Enrollments

Program Completions
```

Date Filters

```txt
Last 7 Days

Last 30 Days

Last 90 Days

Last 12 Months
```

---

# Program Performance Widget

Title

```txt
Program Performance
```

Description

```txt
Top performing coaching programs.
```

Columns

```txt
Program

Students

Completion %

Revenue

Status
```

Example Data

```txt
Happiness Foundations
324
86%
₹4,25,000
Active

Emotional Intelligence
198
82%
₹2,75,000
Active

Mindfulness Mastery
167
91%
₹3,10,000
Active

Certification Program
89
79%
₹5,80,000
Active
```

---

# Enrollment Funnel

Title

```txt
Enrollment Funnel
```

Chart Type

```txt
Vertical Funnel
```

Stages

```txt
Website Visitors

Leads

Discovery Calls

Applications

Enrollments
```

Example Data

```txt
24,500

4,280

1,240

630

146
```

Purpose

```txt
Understand where prospects are dropping off.
```

---

# Upcoming Sessions

Title

```txt
Upcoming Sessions
```

Columns

```txt
Session

Coach

Date

Time

Students

Status
```

Example Data

```txt
Emotional Awareness Workshop
Coach Anita
Jul 12
10:00 AM
42
Scheduled

Mindfulness Mastery
Coach Vikram
Jul 12
03:00 PM
31
Scheduled

Happiness Foundations
Coach Anita
Jul 13
11:00 AM
56
Scheduled
```

---

# Recent Enrollments

Title

```txt
Recent Enrollments
```

Columns

```txt
Student

Program

Source

Enrollment Date

Coach

Fee

Status
```

Example Data

```txt
Rahul Nair
Happiness Foundations
Website
Jul 10
Coach Anita
₹12,500
Active

Priya Menon
Mindfulness Mastery
Instagram
Jul 09
Coach Vikram
₹18,000
Active

Arjun Das
Certification Program
Referral
Jul 08
Coach Anita
₹45,000
Active
```

---

# Coach Performance

Title

```txt
Coach Performance
```

Columns

```txt
Coach

Students

Sessions

Average Rating

Revenue
```

Example Data

```txt
Coach Anita
542
68
4.9
₹5.2L

Coach Vikram
438
54
4.8
₹4.6L

Coach Sarah
304
39
4.9
₹2.7L
```

---

# Notifications Panel

Title

```txt
Notifications
```

Examples

```txt
12 new enrollments today

Mindfulness Mastery starts in 1 hour

Coach Anita completed 3 sessions

Monthly enrollment target reached

New payment received from Rahul Nair

Certification Program reached 90% capacity
```

---

# Future Dynamic Data Sources

## Students

```ts
id
name
email
phone
status
joinedAt
programId
coachId
```

## Programs

```ts
id
name
price
status
capacity
```

## Sessions

```ts
id
programId
coachId
date
attendees
status
```

## Enrollments

```ts
id
studentId
programId
amount
source
createdAt
```

## Coaches

```ts
id
name
specialization
rating
```

## Leads

```ts
id
name
source
stage
assignedCoach
```

---

# Dashboard Goals

The dashboard should allow academy administrators to understand:

* Student growth
* Enrollment trends
* Program performance
* Coach utilization
* Revenue performance
* Session schedules
* Lead conversion
* Operational health

within 10 seconds of opening the dashboard.
