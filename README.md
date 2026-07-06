# Fox Trail — San Joaquin Kit Fox Sighting Tracker

CMPS 3350 (Software Engineering) — Team B, California State University Bakersfield

## Project Name

Fox Trail (San Joaquin Kit Fox Sighting Tracker)

## Problem Statement

The San Joaquin kit fox is an endangered species native to the Central Valley, and Bakersfield is one of the few urban areas where the population persists. There is no simple, public way for local residents to report where and when they see kit foxes. Fox Trail addresses this by providing a lightweight web application where anyone can submit a sighting and browse existing sightings, creating a shared record of kit fox activity in Kern County.

## Target Users

- Kern County residents who spot kit foxes in their neighborhoods and want to report them.
- CSUB students and local wildlife enthusiasts who want to browse recent sighting activity.
- Volunteers or researchers who need a simple, centralized list of community-reported sightings as a starting point for monitoring.

## Final Implemented Features

- Users can view a list of all kit fox sighting records loaded from the backend and database.
- Users can open an individual sighting to see its full details (`/sightings/:id`).
- Users can submit a new sighting record through the Submit form.
- The React frontend calls the deployed Express API for real data (no hardcoded records).
- The backend validates input (required fields, latitude/longitude ranges, positive fox count) and returns clear 400/404 error messages.
- The backend reads from and writes to the MySQL `sightings` table using a `mysql2` connection pool with parameterized queries.
- Request logging with Morgan and security headers with Helmet are applied on the backend.
- Health and diagnostics routes (`/health`, `/db-test`) allow quick production checks.

## Known Limitations

- Update (PUT) and delete (DELETE) routes exist on the backend but are not fully wired into the frontend UI. [VERIFY]
- No authentication — anyone can submit a sighting, and submissions are not moderated.
- Map display of sighting coordinates (Leaflet/OpenStreetMap) is [complete / partial / not integrated]. [VERIFY with Emilio]
- Refreshing a nested route directly (deep link) depends on Nginx fallback behavior and may not work; navigation from the base URL always works.
- Automated tests cover backend validation helpers, not the full deployed API or frontend form edge cases.

## Tech Stack

- Frontend: React with Vite, react-router-dom
- Backend: Node.js / Express (ES modules), mysql2 connection pool, dotenv, Morgan, Helmet
- Database: MySQL (MariaDB) on bender.cs.csubak.edu
- Server: Nginx on bender.cs.csubak.edu
- Process manager: PM2
- Testing: Jest 
- Version control: GitHub

## Production URLs

Frontend URL:
`https://bender.cs.csubak.edu/team-2-s26/`

Backend API base URL:
`https://bender.cs.csubak.edu/carrillo`

Deployment note:
The final frontend is built from the `main` branch (`frontend/`, Vite `base: '/team-2-s26/'`) and the `dist/` output is copied to the team web root. The team's selected MVP backend is Gael Carrillo's backend, running under PM2 and proxied by Nginx at the `/carrillo` route. Individual lab folders (`lab-b-*` through `lab-i-*`) are graded lab work and are not part of the final deployment.

## API Routes

Routes used by the final application:

```
GET    /health              — backend status check
GET    /db-test             — database connectivity check
GET    /sightings           — list all sightings
GET    /sightings/:id       — fetch one sighting
POST   /sightings           — create a sighting
PUT    /sightings/:id       — update a sighting (exists; not used by the frontend UI) [VERIFY]
DELETE /sightings/:id       — delete a sighting (exists; not used by the frontend UI) [VERIFY]
```

## Database Summary

Main table: `sightings`

Important fields:
- `id` — auto-increment primary key
- `observer_name` — required text
- `sighting_date` — required date
- `location_name` — required text
- `latitude` / `longitude` — optional coordinates, validated to ±90 / ±180
- `fox_count` — optional positive integer
- `health_status` — optional text, defaults to "Unknown"
- `notes` — optional text
- `created_at` / `updated_at` — timestamps

## Requirements Trace Table

| Planned Feature or User Story | Status | Evidence | Notes |
| --- | --- | --- | --- |
| User can view sighting records | Yes | Deployed Sightings page; Demo Video timestamp 1.55 | Data loads from the carrillo backend/database |
| User can view a single sighting's details | Yes | Sighting Details page; `GET /sightings/:id` | Reached via the Sightings list |
| User can submit a kit fox sighting | Yes | Submit page; Demo Video timestamp 0.45 | Backend validates required fields and ranges |
| User can update an existing sighting | Partial | `PUT /sightings/:id` | Route works; no frontend edit UI |
| User can delete a sighting | Partial | `DELETE /sightings/:id` | Route works; no frontend delete UI |

## How to Run or Redeploy

Local development:

```
git clone https://github.com/GaelCT/-cmps3350-teamB-The-San-Joaquin-Kit-Fox-project.git foxtrail
cd foxtrail/frontend
npm install
npm run dev        # local dev server

cd ../backend
npm install
# copy .env.example to .env and fill in real values (never commit .env)
npm start
```

Deploying the frontend on Bender:

```
cd /var/www/team-2-s26/repo
git status                     # confirm clean state before pulling
git pull origin main
cd frontend
npm install
npm run build
# copy dist/* (not src/*) into the team web root
```

Deploying / restarting the backend on Bender:

```
cd /var/www/team-2-s26/repo/backend
npm install
npx pm2 list                   # check current processes first
npx pm2 restart <process-name> # restart the team backend process
```

Do not commit or publish `.env`, PEM files, or database credentials. Use `.env.example` as the reference for required variables.

## PM2 / Backend Restart Notes

- On Bender, PM2 is not on the global PATH — always use `npx pm2`.
- Never run `npx pm2 update` on Bender; it restarts the PM2 daemon and disrupts every teammate's processes.
- Always run `npx pm2 list` before stopping or starting anything. Stale processes must be deleted before a new process can bind to the same port.
- One person deploys at a time. Run `git status` before switching branches, and return the shared working copy to `main` when finished.
- Team backend process name: `[VERIFY — ask Gael for the exact PM2 process name]`.

## Testing

- Test framework: Jest in ESM mode (`"type": "module"` plus `--experimental-vm-modules` in the test script).
- Test command: `npm test` (run inside the tested backend folder; see `m4-tests-stephen/`).
- Tested: sighting validation helpers (required fields, ID validation, numeric range checks).
- Not tested yet: the full deployed API over HTTP, database failure cases, and frontend form edge cases.

## Team Contribution Summary

- Gael Carrillo — team lead; owner of the selected team MVP backend (`/carrillo`); server-side deployment and PM2 management.
- Stephen Kegley — Sightings list; Sighting submission; Jest testing work; final README/handoff documentation.
- Ashley — Frontend screens and design.
- Emilio — Map functionality.

## Final Reflection

The final application works as an end-to-end MVP: a user can open the deployed frontend, browse kit fox sightings loaded from the MySQL database through the Express API, view a single sighting's details, and submit a new sighting. Diagnostics routes, request logging, and security headers make the deployed backend easier to verify and debug. What does not work yet is the edit/delete flow in the UI those routes exist on the backend but were never connected to frontend screens and the application has no authentication or moderation, so all submissions are trusted.

The hardest problem was coordinating work on a shared server. With four students deploying to the same machine, we ran into PM2 port conflicts, stale processes, uncommitted server-side edits, and branch collisions in the shared working copy. We solved this with team discipline rather than tooling: one person deploys at a time, everyone checks `git status` and `pm2 list` before acting, and nobody runs destructive commands in the shared directory.

If we had another sprint, we would connect the update and delete routes to the frontend, add moderation or basic authentication for submissions, and expand the test suite to cover the deployed API rather than only validation helpers.

The biggest lesson was that documentation and handing off software is part of building it. Just working code is not a product documentation, deploy steps, honest limitation lists, and restart notes are what make it possible for someone else to pick the project up.
