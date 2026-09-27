# NAIREVA

Private aesthetic journeys in Armenia — a premium concierge product connecting
international clients with selected surgical expertise, built as a real
multi-page product with a backend, a lead/CRM pipeline, medical case intake,
a surgeon review workflow, and a foundation for a future AI consultant.

This is an MVP for a small internal team to operate for real — not a
marketing template. No public pricing anywhere; the concierge layer (NAIREVA)
never performs surgery or makes medical decisions; the surgeon and clinic
always do.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **PostgreSQL** + **Prisma ORM**
- **Auth.js (NextAuth v5)** — credentials login, JWT sessions, role-based access
- **Tailwind CSS** — design tokens ported from the original static prototype (`_legacy-static/`)
- Private object storage abstraction (local disk in dev, S3/R2-compatible in production)
- Zod validation, in-memory rate limiting, HMAC-signed private file URLs

## Project structure

```
src/
  app/
    (site)/            Public marketing site (all pages share Header/Footer/i18n)
    admin/
      login/            Public login page (outside the auth-gated layout)
      logout/           Route handler that signs out and redirects
      (protected)/       Everything that requires a session — dashboard, leads,
                          cases, surgeons, procedures, before/after, journal, FAQ
      _actions/          Server Actions used by the admin forms (auth-checked)
    api/
      consultation/      Public intake endpoint (rate-limited, Zod-validated)
      admin/files/        Signed-URL file serving for private case photos
      auth/[...nextauth]/ Auth.js route handler
  components/           UI, organized by area (home, admin, consultation, …)
  lib/
    auth.ts / auth.config.ts   NextAuth setup (config split for edge middleware)
    db.ts                       Prisma client singleton
    storage.ts / signed-url.ts Private file storage abstraction
    leads.ts                    Shared intake → Lead/MedicalCase creation logic
    ai/                         AI consultant boundary (not a live feature yet — see ai/README.md)
    i18n/                       EN/RU dictionaries + locale cookie handling
    validation/                 Zod schemas
  middleware.ts          Protects /admin/* (redirects unauthenticated visitors to /admin/login)
prisma/
  schema.prisma          Full data model (see spec section 9 for the source of truth)
  seed.ts                Seeds an admin user, Dr. Hayk Bakhshyan, rhinoplasty, one
                          before/after case and three journal posts
_legacy-static/          The original static HTML/CSS prototype this app's
                          visual language and copy were ported from — kept for
                          reference, not served by the app.
```

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start Postgres** (or point `DATABASE_URL` at a hosted instance — Neon,
   Supabase, Railway all work):

   ```bash
   docker compose up -d
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Generate a real `NEXTAUTH_SECRET` (`openssl rand -base64 32`). Everything
   else has a sensible local default — SMTP is optional (see below).

4. **Migrate and seed**

   The initial migration (`prisma/migrations/20260926195403_init`) is already
   generated and committed — it was produced with `prisma migrate diff`
   against the schema directly, since this environment has no local Postgres
   to run `prisma migrate dev` against. Apply it and seed:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

   (`db:migrate` runs `prisma migrate dev`, which applies the existing
   migration and will generate a new one for any schema change you make
   afterwards — same command either way.)

   The seed creates an admin account using the email in `SEED_ADMIN_EMAIL`
   (defaults to the address that requested this build) with the password
   `ChangeMe123!` — **change it immediately** via the database or a future
   "change password" admin feature (not yet built; for now, update
   `passwordHash` directly with `bcrypt.hash`).

5. **Run it**

   ```bash
   npm run dev
   ```

   Public site at `http://localhost:3000`, admin at `/admin/login`.

## What's real vs. what's a placeholder

Built and working end-to-end: the full public site, the step-based
consultation form (creates a `Lead` + `MedicalCase`, saves attribution/UTMs,
stores uploaded photos privately, notifies the team), the admin CRM (leads,
medical cases, surgeon video-consultation scheduling, trip planning, internal
notes, activity timeline), and full CRUD for surgeons/procedures/before-after
cases/journal/FAQ.

Deliberately placeholder, flagged in the code and UI:

- **Surgeon biography, credentials, certifications, experience.** Seeded with
  `[PLACEHOLDER]` markers per spec §26 — do not publish invented years of
  experience, procedure counts, or claims.
- **Privacy policy and Terms** (`/privacy`, `/terms`) — structurally complete,
  explicitly marked as needing legal review before launch (spec §19).
- **AI consultant** — not a live conversational feature. The data model
  (`Conversation`, `ConversationMessage`, `IntakeSummary`) and the API
  boundary (`src/lib/ai/intake-boundary.ts`) exist so it's additive later;
  see `src/lib/ai/README.md` for the hard rules whatever builds it must
  follow (no diagnosis, no outcome promises, no candidacy confirmation).

## Product decisions made without explicit spec direction (flagged, not hidden)

- **`/rhinoplasty` redirects to `/procedures/rhinoplasty`.** The spec lists
  "Procedures" and "Rhinoplasty" as separate pages, but rhinoplasty is also
  the first row in the data-driven `Procedure` table. Rather than maintain
  two copies of the same content, `/rhinoplasty` is a canonical-friendly
  redirect — it keeps a memorable URL for marketing without content drift.
- **Lead detail page hosts full case management inline** (photos, notes,
  video-consultation scheduling, trip planning), rather than only linking out
  to a separate case page. Spec §10 lists those actions under both "Lead
  detail page" and "Medical Cases", so the same `CaseManagementPanel`
  component is reused in both places instead of building it twice.
- **i18n covers the entire public site**, not just the home page: every
  page's chrome, headings, form labels and buttons come from
  `src/lib/i18n/dictionaries.ts`. Database-driven content (procedures,
  surgeon bio, journal posts, FAQ, before/after case notes) has nullable
  `*Ru` columns (see the `add_ru_translations` migration) that fall back to
  the English field when empty — `src/lib/i18n/localized.ts` is the one
  helper that picks the right one, and the admin CRUD forms have a
  collapsible "Russian translation" section for editors to fill them in.
  The seed data includes real Russian translations for the demo content.
  Two small, deliberate gaps: `Surgeon.education/certifications/languages`
  and `Procedure.gallery` are `Json` string arrays (not paired en/ru fields),
  so short label lists inside them stay English-only — restructure those to
  `{en, ru}[]` if per-item translation becomes worth the complexity; and
  Playfair Display/DM Sans (the brand's serif/sans pairing) don't ship a
  Cyrillic subset via `next/font`, so Russian headings fall back to the
  browser's default serif/sans.
- **All public, data-driven pages are `force-dynamic`** rather than
  statically generated or ISR. This was necessary to get a clean build
  without a reachable database at build time, and is also the right default
  early on — admin edits should show up immediately. Once traffic and a
  stable content cadence justify it, switch the procedure/surgeon/journal
  pages to time-based revalidation (`export const revalidate = ...`) for
  better performance.
- **Case photo "signed URLs" in local dev are HMAC-signed app routes, not
  real cloud signed URLs** (`src/lib/signed-url.ts` + `/api/admin/files`).
  Functionally equivalent (time-limited, tamper-proof, admin-auth-gated) but
  worth knowing before assuming production parity — set `STORAGE_DRIVER=s3`
  for real bucket-issued signed URLs.

## Roles

`ADMIN`, `COORDINATOR`, `MEDICAL_TEAM`, `SURGEON` (see `prisma/schema.prisma`
`Role` enum). `ADMIN` can manage content (surgeons/procedures/before-after/
journal/FAQ) and delete records. `ADMIN`, `COORDINATOR` and `MEDICAL_TEAM` can
manage leads/cases (status, assignment, notes, scheduling). `SURGEON` has
read access plus notes, by design (`canManageLeads` / `isAdmin` in
`src/lib/auth.ts`) — extend those helpers if you need finer-grained
per-action permissions later.

## Email

Without `SMTP_HOST` set, outgoing mail (new-lead alerts to the team) is
logged to the console instead of sent — the consultation flow works out of
the box with zero mail configuration. Set the `SMTP_*` env vars for real
delivery.

## File storage

`STORAGE_DRIVER=local` (default) writes uploaded consultation photos to
`./storage/uploads` — fine for local dev and a single-instance deployment.
Set `STORAGE_DRIVER=s3` plus the `STORAGE_*` vars to target any S3-compatible
bucket (AWS S3, Cloudflare R2, Supabase Storage's S3 endpoint, MinIO). Photos
are never publicly reachable either way — every access goes through an
authenticated admin session and a short-lived signed URL.

## Known limitations to revisit

- The in-memory rate limiter (`src/lib/rate-limit.ts`) doesn't share state
  across serverless instances — fine for a single Node process, swap for
  Upstash/Redis if the consultation endpoint gets meaningful traffic on a
  multi-instance serverless deployment.
- `next@14.2.35`'s own nested `postcss` dependency has an open advisory
  (source-map path traversal at build time — not a runtime/production
  exposure). Fixing it means moving to Next 15/16, a bigger jump than this
  MVP takes on; revisit when doing a dependency-major-version pass.
- **Consultation photo uploads go through one API route as multipart
  `FormData`** (`src/app/api/consultation/route.ts`), capped at 8 photos ×
  12MB. That's simple and works on a normal Node server, but standard Vercel
  serverless functions cap request bodies at 4.5MB — a real submission with
  photos could exceed that in production on Vercel specifically. Before
  relying on photo uploads at volume on Vercel, switch to client-side direct
  uploads (presigned `PUT` URLs from `src/lib/storage.ts`'s S3 driver,
  photos uploaded straight to the bucket, then only the resulting storage
  keys sent to `/api/consultation`) so large files never pass through the
  function itself.
- No automated test suite yet. Given the MVP timeline, verification here was
  manual: `tsc --noEmit`, `next build`, and running the dev server against
  the routes that don't need a live database. Add integration tests around
  `createLeadWithCase` and the admin status-change actions before this
  handles real client data at volume.

## Deployment (Vercel + hosted Postgres + S3-compatible storage)

1. Provision Postgres (Neon/Supabase/Railway) and an S3-compatible bucket
   (S3, R2, Supabase Storage).
2. Push this repo to GitHub, import it in Vercel.
3. Set all variables from `.env.example` in the Vercel project (production +
   preview). Use a strong, unique `NEXTAUTH_SECRET`.
4. Run `npx prisma migrate deploy` against the production database (a Vercel
   build step, or manually before first deploy).
5. Run `npm run db:seed` once against production (or create the first admin
   user directly) — then change the seeded password immediately.
6. Deploy. Confirm `/admin/login` works and the consultation form on `/consultation`
   creates a lead you can see in `/admin/leads`.
