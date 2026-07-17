# Vantage HR — Monalisa Tech Solutions

A complete multi-tenant HR & Employee Management SaaS prototype.
Pure HTML, CSS, and JavaScript — no build tools, no framework, no backend.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Full HR admin platform — all 26 modules |
| `styles.css` | All styles shared by the admin app |
| `app.js` | All logic, data, render functions, and events |
| `landing.html` | Public marketing landing page |
| `portal.html` | Employee self-service portal |
| `README.md` | This file |

---

## Deploying to GitHub Pages

1. Push all files to a GitHub repository root.
2. Go to **Settings → Pages → Source → main / root**.
3. Your URLs will be:

| Page | URL |
|---|---|
| Landing page | `https://username.github.io/repo/landing.html` |
| HR admin app | `https://username.github.io/repo/index.html` |
| Employee portal | `https://username.github.io/repo/portal.html` |

> Set `landing.html` as the default by renaming it to `index.html` and renaming the current `index.html` to `app.html` — then update the "Open the app" links accordingly.

---

## Demo accounts — HR Admin (`index.html`)

| Email | Organisation |
|---|---|
| `patricia@kampalaridgehospital.org` | Kampala Ridge Hospital |
| `brian@nilelogistics.co.ug` | Nile Logistics Co. |
| `diana@equatormfb.co.ug` | Equator Microfinance Bank |

Any password works. All three orgs are fully populated with employees, payroll, leave, recruitment pipelines, performance reviews, and more.

---

## Employee Portal (`portal.html`)

Select any organisation, then select any employee name. Employees see:
- **Home** — greeting, leave balance summary, upcoming leave, recognition received, announcements
- **My Payslips** — 6 months of payslip history with gross/PAYE/NSSF/net breakdown and print to PDF
- **My Leave** — leave balance bars, submit a new leave request, full request history
- **My Goals** — goals assigned directly or to their department
- **My Learning** — enrol in courses, mark as complete, mandatory flags
- **My Profile** — personal info, recognition wall, documents

Progress (course completions, leave requests) is saved in browser localStorage per employee.

---

## Modules in the HR admin app

Dashboard · Employees · Leave & Attendance · Shift Scheduling · Recruitment · Payroll · Performance · Reports · Org Chart · Benefits · Expenses · Assets · Learning & Development · Engagement & Surveys · Service Desk · Announcements · Travel · Onboarding · Knowledge Base · Succession Planning · Workforce Planning · Compensation Planning · Executive Dashboard · e-Signatures · Notifications · Settings

---

## Business contact

**Monalisa Tech Solutions**
kabuusumonalisa@gmail.com · +256 703 953 711 · Uganda, East Africa
