# The Farhan World — Media Website

A mobile-friendly technology media site built with Next.js and Supabase. Public visitors can read published articles. Only the site admin can create, edit, publish, upload and delete content.

## Features

- Responsive dark tech-media design; English default.
- Homepage, categories, article detail pages and public search query support.
- Private admin login with an HTTP-only signed session cookie.
- Admin can create/edit/delete articles and choose Draft or Public.
- Upload cover images and attach video/PDF/ZIP/APK/Office files.
- Public visitors can view published content only.
- Supabase Row Level Security protects the public posts table; server-only service-role key handles admin writes.
- Upload size limit: 100 MB per file. Vercel function request limits may be lower depending on plan; for larger videos use direct-to-storage uploads.

## 1. Create Supabase project

1. Create a project at https://supabase.com.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Open Project Settings → API and copy:
   - Project URL
   - `anon` / publishable key
   - `service_role` key (secret; server only)

The `media` Storage bucket is created by the SQL script.

## 2. Deploy on Vercel from ZIP

1. Extract the ZIP if Vercel Drop does not accept it directly; upload the project folder using Vercel's supported import flow.
2. Set Framework Preset to Next.js if prompted.
3. Add all environment variables below before deploying, or add them in Project Settings → Environment Variables and redeploy.

Required Vercel Environment Variables:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role secret |
| `ADMIN_EMAIL` | Your admin email (reserved for your records) |
| `ADMIN_PASSWORD` | A long, unique admin password |
| `SESSION_SECRET` | Random secret at least 32 characters |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL |

Generate a strong SESSION_SECRET, for example with a password manager. Do not reuse your Cartesia key or any other password.

## 3. Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## 4. Admin

Visit `/world-studio-gate/login` and enter `ADMIN_PASSWORD`. The private admin dashboard is `/world-studio-gate`. No admin/login link is shown on the public website.

Draft posts are private. Select **Public — everyone** to publish. Published posts appear on the homepage and category pages.

## 5. File upload notes

Supported cover images: JPG, PNG, WebP, GIF, AVIF.
Supported attachments: MP4, WebM, MOV, PDF, ZIP, APK, DOC/DOCX and other Office Open XML files.
The app stores uploaded media in a public Supabase Storage bucket, so uploaded media URLs are public. Do not upload private or sensitive files. A published article and its media are publicly accessible to anyone with the URL.

For large video uploads, use a dedicated direct-to-storage upload flow or a video platform/CDN. Vercel serverless function request limits can prevent large uploads even when the app's 100 MB validation allows them.

## Security

- Keep `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `SESSION_SECRET` server-side only.
- Never commit `.env.local` or paste secrets into chat.
- Change the admin password and session secret before production.
- The admin login currently uses one shared password. Add rate limiting / stronger identity provider before opening admin access to multiple people.
- Public posts are read-only for visitors. All writes go through authenticated server routes.

## Important

This project is a working foundation, not a guarantee of production readiness. Configure Supabase and Vercel environment variables, run a deployment, then test login, publishing, file uploads and public viewing. Large uploads and high traffic may require a different storage/CDN setup.
