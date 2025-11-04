# Lera

Lera is a learning experience platform that provides rich content for English language learners. This repository now includes a fully featured mock backend API that powers the application during development.

## Backend API

### Getting started
1. Navigate to the backend package:
   ```bash
   cd backend
   ```
2. Install dependencies (the backend runs without external packages, so this step simply ensures your local `package-lock.json` stays up to date):
   ```bash
   npm install
   ```
3. Start the API server:
   ```bash
   npm start
   ```

The server runs on port **3000** by default. You can override the port by setting the `PORT` environment variable.

### Available endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/health` | Health check with uptime metadata. |
| GET | `/api/courses` | Paginated course catalog with filtering by `level`, `category`, `tag`, and `search`. |
| GET | `/api/courses/:courseId` | Course detail with instructor info and ordered lessons. |
| GET | `/api/lessons` | List lessons; filter by `courseId` or `status`. |
| GET | `/api/lessons/:lessonId` | Retrieve a specific lesson. |
| GET | `/api/users` | Learner directory; filter by `role` (student or instructor). |
| GET | `/api/users/:userId` | Retrieve a specific learner or instructor. |
| GET | `/api/payments` | Payment history; filter by `status` or `userId`. |
| GET | `/api/analytics` | Aggregated revenue, course performance, and engagement metrics. |
| GET | `/api/live-sessions` | Calendar of live sessions; filter by `status` or `courseId`. |
| GET | `/api/workflows` | List automation workflows available in the platform. |
| POST | `/api/workflows` | Create a new workflow by providing `name`, optional `description`, `status`, and `steps`. |

### Sample workflow payload
```json
{
  "name": "Writing Feedback Loop",
  "description": "Route writing submissions to instructors for review.",
  "status": "active",
  "steps": [
    { "title": "Notify instructor", "type": "notification", "dueAfterHours": 1 },
    { "title": "Review submission", "type": "task", "dueAfterHours": 4 }
  ]
}
```

### Notes
- The API server uses Node's built-in HTTP primitives, so no external npm dependencies are required for the backend.
- The API is stateless aside from in-memory workflow creation. Restarting the server resets workflows to their seeded defaults.
- Data is intentionally rich to simulate production-ready responses for the frontend.

## Frontend

The frontend is built with **Vite + React + TypeScript** and lives under the `src/` directory.

### Getting started
1. Install dependencies at the repository root:
   ```bash
   npm install
   ```
2. Launch the development server with hot module reloading:
   ```bash
   npm run dev
   ```
3. Open the printed `http://localhost:5173` URL in your browser. The client proxies API requests to the backend during
   development, so start the backend server separately if you want live data.

### Directory guide

| Path | Description |
| ---- | ----------- |
| `src/main.tsx` | Bootstraps React, wraps providers, and renders `<App />`. |
| `src/App.tsx` | Declares the router structure for public routes and role-specific dashboards. |
| `src/pages/` | Top-level route views such as `HomePage`, `CoursesPage`, `WorkflowsPage`, and dashboards. |
| `src/components/` | Reusable UI like layout (`Navbar`, `Footer`), cards, charts, and form controls. |
| `src/contexts/` | React context providers (authentication, courses) consumed throughout the app. |
| `src/lib/api.ts` | Lightweight API client that wraps `fetch` against the mock backend. |
| `src/utils/` | Helpers including constants, formatting utilities, and role-based route definitions. |

### Notable screens

- **HomePage** (`src/pages/HomePage.tsx`) showcases hero content, featured courses, testimonials, and CTAs.
- **CoursesPage** (`src/pages/CoursesPage.tsx`) lists courses with filtering, category pills, and pagination.
- **CourseDetailPage** (`src/pages/CourseDetailPage.tsx`) displays instructor bios, lesson outlines, and enrollment actions.
- **DashboardPage** (`src/pages/DashboardPage.tsx`) loads widgets tailored by user role via `RoleBasedRedirect`.
- **WorkflowsPage** (`src/pages/WorkflowsPage.tsx`) consumes the backend automation workflows API and renders step details.

Most components use Tailwind utility classes for styling. Shared UI primitives live under `src/components/ui/`, while charts and
analytics widgets live under `src/components/dashboard/`. The project ships with mock data in `src/data/` so the UI renders even
without the backend running.
