# Dashboard App

A responsive, full-featured analytics dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Redux Toolkit**.

---

## Features

| Feature            | Implementation                                                              |
| ------------------ | --------------------------------------------------------------------------- |
| **Authentication** | Mocked API with Redux + localStorage persistence                            |
| **Data Table**     | Sort, filter, pagination — managed entirely in Redux                        |
| **Charts**         | 4 Recharts components: revenue line, status pie, methods bar, stats cards   |
| **Export**         | PDF (jsPDF + autotable) and Excel (xlsx + file-saver)                       |
| **Dark Mode**      | CSS variable–based theme toggled via Redux `uiSlice`                        |
| **Responsive**     | Mobile-first Tailwind layout; sidebar collapses to overlay on small screens |
| **Docker**         | Multi-stage Docker build with a minimal Alpine runner image                 |

---

## Implementation Approach

The application is built on **Next.js 16 App Router** with **TypeScript** throughout, using **Redux Toolkit** as the single source of truth for all application state and **Tailwind CSS v4** for styling.

### Architecture

The project is split into four clear layers — `app/` (routing & pages), `components/` (UI), `store/` (state), and `lib/` (API, mock data, utilities) — following a separation-of-concerns principle that keeps each layer independently testable and easy to navigate.

### Authentication

Auth is handled by a **mocked API** (`lib/api/auth.ts`) that validates credentials against a hardcoded user list and returns a fake JWT token. `authSlice` persists the user session to `localStorage` on login and restores it on page load, so refreshing the browser doesn't log the user out. Route protection lives in the dashboard layout component — any unauthenticated request is immediately redirected to `/login`.

**Demo credentials:** `admin@test.com` / `Admin@1234` · `user@test.com` / `User@1234`

### State Management

Three Redux slices cover the full app:

- **`authSlice`** — login, logout, and session hydration from `localStorage`
- **`dataSlice`** — transaction records plus a pre-computed `filteredTransactions` array that is updated synchronously inside each relevant reducer (filter, sort, paginate), so the UI never recomputes on render
- **`uiSlice`** — sidebar collapsed state and dark/light theme toggle

### Data Table

Filtering (text search + status dropdown), multi-column sorting, and pagination are all Redux-driven inside `dataSlice`. Because `applyFiltersAndSort()` runs inside the reducer, the store always holds a ready-to-render filtered slice — the table component simply reads it with no additional computation.

### Export

Both export formats respect the **currently active filter**, so users always export what they see. PDF export uses **jsPDF + jspdf-autotable** for a styled table layout; Excel export uses **xlsx + file-saver** to stream a `.xlsx` workbook directly to the browser.

### Charts & UI

Four **Recharts** components (revenue trend, status distribution, payment methods, KPI stat cards) derive their data directly from the Redux store. The design system is built from scratch as composable atoms (`Button`, `Input`, `Badge`, `Select`, `Card`) styled with CSS variables, enabling seamless dark/light mode switching without any flash-of-unstyled-content.

---

## Getting Started

### Option A — Local Development

**1. Clone the repository**

```bash
git clone https://github.com/jehanusama/Dashboard-Application.git
cd Dashboard-Application
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the dev server**

```bash
npm run dev
```

**4. Open the app**

Navigate to **http://localhost:3000** in your browser.  
You will be redirected to the login page.

**5. Log in**

| Role  | Email            | Password     |
| ----- | ---------------- | ------------ |
| Admin | `admin@test.com` | `Admin@1234` |
| User  | `user@test.com`  | `User@1234`  |

---

### Option B — Docker (Production Build)

> **Prerequisite:** Docker Desktop must be installed and running.

**1. Clone the repository**

```bash
git clone https://github.com/jehanusama/Dashboard-Application.git
cd Dashboard-Application
```

**2. Build and start the container**

```bash
docker compose up --build
```

**3. Open the app**

Navigate to **http://localhost:3000** in your browser and log in with the credentials above.

**To stop the container:**

```bash
docker compose down
```

> Alternatively, build and run the image manually:
>
> ```bash
> docker build -t dashboard-app .
> docker run -p 3000:3000 dashboard-app
> ```

---

## Git Flow Branching Strategy

This project follows **Git Flow**:

| Branch      | Purpose                                                            |
| ----------- | ------------------------------------------------------------------ |
| `main`      | Production-ready code only                                         |
| `develop`   | Integration branch for completed features                          |
| `feature/*` | One branch per feature (e.g. `feature/auth`, `feature/data-table`) |
| `fix/*`     | Bug fixes branched from `develop`                                  |
| `release/*` | Release preparation before merging to `main`                       |

Commits follow a consistent pattern:  
`type(scope): short description` — e.g. `feat(table): add PDF and Excel export`

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State**: Redux Toolkit 2
- **Charts**: Recharts 3
- **Export**: jsPDF, jspdf-autotable, xlsx, file-saver
- **Icons**: Lucide React
- **Containerisation**: Docker (Node 20 Alpine)
