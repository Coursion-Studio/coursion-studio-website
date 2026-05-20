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

- `index.html` — landing + product grid
- `privacy.html` — studio-wide privacy
- `styles.css` — shared dark theme (mirrors the MacApps product sites)
- `assets/` — icons, OG image, product art
