# DAVAN Technologies

The public website is a static HTML/CSS/JavaScript site intended for GitHub Pages. Its Careers section uses Supabase as the managed backend.

## Website
- Careers: `/careers/`
- Roles: `/careers/full-stack-developer/`, `/careers/flutter-developer/`, `/careers/management-intern/`
- Public founding-member profiles: Shudhanshu Yadav (Founding Member) and Pallavi Madavan (Founding Member · Past).

## Careers platform
- Openings and role detail are fetched from `public.career_openings` at runtime. The three initial roles have dedicated static paths; any additional published slug uses the shared static `careers/role.html?slug=...` detail page.
- Applications are submitted to `public.career_applications`.
- Resume PDFs are uploaded to the private `davan-resumes` Supabase Storage bucket (PDF only, 5 MB maximum).
- PDF.js extracts skill suggestions from selectable PDF text. Candidates can edit, remove or add skills manually.
- Applicants cannot read application records or set review statuses.
- No server-side API route or Supabase service-role key is used by the GitHub Pages frontend.
- New applications can be reviewed in the Supabase dashboard. Email notifications are not configured.

## Supabase
Project: `DAVAN-CAREERS` (`svsweslezorghidounxd`)  
Region: `ap-south-1` (Mumbai)  
The public publishable key is used in `js/careers.js`. Never store a secret/service-role key in this repository.

## GitHub Pages
The static site files live at the repository root: `index.html`, `css/`, `js/`, `pages/`, `careers/`, `assets/`, and `public/`. GitHub Pages must publish the repository root (or a workflow artifact containing these root-level files). The Next.js `app/` directory is source code and is not the runtime for GitHub Pages.

Before merging, verify the repository's Pages settings point at the intended publishing branch/root. Test the listing, role pages, PDF parsing, private upload and application insert on a preview.

## Local preview
Serve the repository root with a local HTTP server (not `file://`) so browser API calls to Supabase work:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
