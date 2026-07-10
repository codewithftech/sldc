# SLDC Next.js App

This is the Next.js version of the mirrored SLDC static site. It keeps the **same HTML structure, CSS, JS, images, and fonts** as the original download.

## Run locally

```bash
cd next-app
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Project structure

```
next-app/
├── app/                         # Next.js routes (one folder per page)
├── components/
│   ├── layout/                  # Shared shell components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Drawer.tsx
│   │   ├── HeaderBottomBar.tsx
│   │   ├── PageBody.tsx
│   │   ├── SiteStyles.tsx
│   │   ├── SiteScripts.tsx
│   │   └── SvgSprites.tsx
│   └── pages/                   # Per-route page folders
│       ├── home/
│       │   ├── index.tsx        # page composer
│       │   ├── HeroBanner.tsx
│       │   ├── KeyProofPoints.tsx
│       │   └── ...
│       ├── about-sldc/
│       │   ├── index.tsx
│       │   ├── PageBanner.tsx
│       │   ├── WhoWeAre.tsx
│       │   └── ...
│       └── _staging/            # temp monolithic files from HTML convert
├── public/                      # Junctions to original static assets
│   ├── sites/
│   ├── themes/
│   ├── profiles/
│   ├── modules/
│   └── core/
└── scripts/ (in parent folder)  # HTML conversion utilities
```

## Pages

- `/` Home
- `/about-sldc`
- `/leadership`
- `/services`
- `/operations`
- `/hse-quality`
- `/people-careers`
- `/news-updates`
- `/contact`
- `/privacy-policy`
- `/cookie-policy`
- `/terms-use`
- `/sitemap`
- `/speakup-hotline`
- `/search-result`

## Static assets

Asset folders in `public/` are Windows junctions to the original mirrored folders in the parent directory. If links break after moving the project, run:

```bat
setup-public-links.bat
```

## Re-convert HTML after site updates

From the repo root:

```bash
python scripts/convert_html.py
python scripts/extract_layout.py
python scripts/convert_layout.py
```

`convert_html.py` writes staging files and automatically runs `split_pages.py` to regenerate per-route section components.

To re-split only (without re-converting HTML):

```bash
python scripts/split_pages.py
```

## Notes

- Original Drupal CSS/JS is loaded unchanged for visual parity.
- Some third-party assets (Bootstrap, Slick, Google Fonts, cookie manager) still load from CDN when internet is available.
- `governance-and-compliance` was not in the mirror (403 on download).
