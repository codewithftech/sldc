# SLDC — Local Development Copy

Source: https://sldc.sid2-e1.investis.com/
Downloaded: home page + main pages (1 level deep) with all local assets
(CSS, JS, images, fonts). Paths rewritten to work offline via a local server.

## Kaise chalayein (How to run)

**IMPORTANT:** File ko browser mein directly (`file://`) mat kholein — links/CSS
theek se load nahi honge. Ek chhota local server chalayein:

### Option 1 — Python (recommended)
Is folder ke andar terminal khol kar:
```
python -m http.server 8000
```
Phir browser mein kholein: http://localhost:8000/

Ya seedha `run.bat` par double-click karein.

### Option 2 — VS Code
"Live Server" extension install karke `index.html` par "Go Live" click karein.

## Pages jo download huay
- Home (index.html)
- About SLDC, Leadership, Services, Operations, HSE & Quality,
  People & Careers, News & Updates, Contact
- Privacy Policy, Cookie Policy, Terms of Use, Sitemap, Speak-up Hotline,
  Search result

## Notes
- Kuch third-party libraries (Bootstrap, Slick, Select2, Google Fonts,
  cookie manager) CDN se load hoti hain — internet on hone par yeh
  automatically aa jayengi. Fully offline chahiye to inhein bhi download
  karna padega.
- `governance-and-compliance` page server ne 403 (protected) diya, isliye
  woh download nahi hua.
- Dobara download / update karne ke liye parent folder mein:
  `python mirror_site.py`
