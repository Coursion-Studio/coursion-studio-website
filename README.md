# coursion.studio

Public marketing site for Coursion Studio. Static HTML/CSS hosted on GitHub Pages at https://coursion.studio.

## Develop

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushing to `main` deploys via GitHub Pages. `CNAME` pins the custom domain to `coursion.studio`.

### DNS

At the registrar, point apex A records to GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And `www` CNAME → `<github-user>.github.io`.

## Structure

- `index.html` — studio landing: app catalog, Mac showcase, iPhone apps, principles
- `privacy.html` — studio-wide privacy
- `styles.css` — shared styles for both pages
- `assets/icons/`, `assets/shots/` — app icons and screenshots (WebP)
- `assets/fonts/` — self-hosted Bricolage Grotesque (OFL)
- `assets/og.png` — social preview image
