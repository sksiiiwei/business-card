# business-card

Business card site of sksiiiwei: web and API pentesting, AI/ML security, DFIR. Plain HTML, CSS and JavaScript, no build step.

Tabs: About / Skills, Writeups, Utilities, Certificates. Russian and English, dark and light theme.

## Edit the content

Everything you read on the site lives in `assets/data.js`:

- `findings` and `caseSteps`: the disclosure log and the MLflow case on the About tab
- `skills`: the toolbox list
- `writeups`: one entry per file in [sksiiiwei/tryhackme](https://github.com/sksiiiwei/tryhackme); add a line when you publish a new machine. `cats` feeds the technique chart and filters
- `utilities`: tools and the DFIR case study
- `certificates`: add `url: "https://..."` to an item to link its credential

Interface text (headings, intros) is in `assets/app.js`, colors and spacing in `assets/style.css`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

Repository Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`. The site goes live at `https://sksiiiwei.github.io/business-card/`.
