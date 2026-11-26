# DAVAN Technologies website

Public website for DAVAN Technologies, built with Next.js App Router, TypeScript and Tailwind CSS v4. The existing `gensolutions.in` domain is retained.

## Careers platform

- Dynamic opening list at `/careers` backed by Supabase.
- Dedicated role pages at `/careers/[slug]`.
- Application form collects name, email, education, city, current employment status, role, resume, achievements and skills.
- PDF.js extracts skill suggestions from PDF resume text; candidates can review and edit suggestions before submission.
- PDF resumes are uploaded to the private `davan-resumes` bucket (5 MB maximum).
- Application records are written to `public.career_applications`.
- Both public tables have Row Level Security enabled. Openings are publicly readable; applicant rows are insert-only for anonymous applicants and are not publicly readable.
- Management reviews candidates in Supabase. No public applicant list or unauthenticated admin dashboard is exposed.

## Supabase project

Project: `DAVAN-CAREERS` (`svsweslezorghidounxd`)  
Organization: Gensolutions  
Region: `ap-south-1` (Mumbai)

Public configuration is in `.env.example`. The publishable key is designed for browser use. Never put a Supabase secret/service-role key in frontend code.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Production checks

```bash
npm run lint
npm run build
npm run start
```

## Deployment

Changes are prepared on the `davan-careers` branch. The connected Vercel team did not show an existing project linked to this repository, and the website domain could not be fetched during verification. Do not change DNS or replace the current live host until the active production provider is confirmed. Deploy this branch to a preview environment first, configure the two public Supabase values, verify an end-to-end test application, then promote it.

## Before public launch

- Confirm the production host and domain binding.
- Configure a verified email provider if hiring application notifications are required.
- Add an approved privacy notice and candidate-data retention period.
- Review recruitment wording and the final poster asset.
- Test resume upload, PDF extraction, mobile layouts and application submission.
