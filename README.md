# cheeunhong.github.io

Personal academic website, built with Next.js + Tailwind CSS and statically exported to GitHub Pages.
The design is adapted from [JLPM22/jlpm22.github.io](https://github.com/JLPM22/jlpm22.github.io).

## Updating content

Everything on the site comes from the `content/` folder — no code changes needed.

| File | What it controls |
| --- | --- |
| `content/profile.yml` | Name, title, institution, email, social links, CV path |
| `content/about.md` | Bio on the home page (and the keywords line, in the front matter) |
| `content/news.yml` | News on the home page (latest 5 shown) |
| `content/experience.yml` | "Work experience" on the home page |
| `content/education.yml` | "Education" on the home page |
| `content/publications.yml` | All publications; `selected: true` puts a paper on the home page |
| `content/venue_colors.txt` | Color for each venue tag (CVPR, ECCV, ...) |
| `content/coauthors.yml` | Co-author names that become links |
| `content/awards.yml` | Awards & Honors |
| `content/teaching.yml` | Teaching |
| `content/service.yml` | Academic Service |

Files served as-is live in `public/`:

- `public/previews/` — publication preview images (referenced by `preview:` in `publications.yml`)
- `public/assets/pdf/` — CV PDF (referenced by `cv:` in `profile.yml`)
- `public/prof_pic.jpg` — profile photo

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
This requires **Settings → Pages → Build and deployment → Source: GitHub Actions** on the repository.
