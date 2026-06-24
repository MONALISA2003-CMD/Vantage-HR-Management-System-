# Vantage HR — Monalisa Tech Solutions

A multi-tenant HR & Employee Management SaaS prototype built in plain HTML, CSS, and JavaScript. No build tools, no dependencies, no backend required.

## Files

| File | Purpose |
|---|---|
| `index.html` | All markup — pages, modals, drawers |
| `styles.css` | All styles — tokens, components, responsive rules |
| `app.js` | All logic — data, render functions, events, persistence |

## Running locally

Just open `index.html` directly in any modern browser. No server needed.

## Deploying to GitHub Pages

1. Push all three files to a GitHub repository (root or `/docs` folder).
2. Go to **Settings → Pages** in your repository.
3. Set **Source** to the branch and folder containing the files.
4. GitHub Pages will serve `index.html` at `https://your-username.github.io/your-repo/`.

> Because the app uses `type="module"` for the script tag, it must be served over HTTP/HTTPS — not opened as a `file://` URL when hosted remotely. Locally, opening `index.html` directly still works in most browsers.

## Demo accounts

| Email | Organization |
|---|---|
| patricia@kampalaridgehospital.org | Kampala Ridge Hospital |
| brian@nilelogistics.co.ug | Nile Logistics Co. |
| diana@equatormfb.co.ug | Equator Microfinance Bank |

Any password works — authentication is simulated for the prototype.

## Modules included

Dashboard · Employees · Leave & Attendance · Shift Scheduling · Recruitment · Payroll · Performance · Reports · Org Chart · Notifications · Settings (General, Team, Billing, Security, API & Webhooks)

---

Built by **Monalisa Tech Solutions** · kabuusumonalisa@gmail.com · +256703953711 · Uganda, East Africa
