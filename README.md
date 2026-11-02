# Fresh Harvest Grocery

A responsive multi-page grocery website for the WEDE5020 Web Development project.

## Pages
- `index.html` – home page and featured products.
- `pages/about.html` – store information, mission and values.
- `pages/products.html` – searchable, filterable and sortable product categories with an image lightbox.
- `pages/enquiry.html` – product/service enquiry form with HTML and JavaScript validation.
- `pages/contact.html` – general contact form, contact details and Johannesburg map area.

## Project structure
```text
FRESH HARVEST GROCERY/
├── index.html
├── pages/
├── css/style.css
├── js/main.js
├── assets/
├── robots.txt
├── sitemap.xml
├── README.md
└── CHANGELOG.md
```

## Run locally
Open `index.html` in a browser, or run a simple local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. The product search, filtering, sorting, accordion, mobile navigation, lightbox and client-side validation work in the local preview. The forms attempt a Netlify Forms POST when hosted on Netlify; if no form endpoint is available, they open a pre-addressed email draft for the visitor to review and send.

## Deployment (Netlify)
1. Push this project folder to your GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Set the publish directory to the project root (no build command is required).
4. Deploy. Netlify detects the forms named `contact` and `enquiry`; enable form notifications in the Netlify dashboard if email alerts are required.
5. After deployment, replace `YOUR-PUBLISHED-DOMAIN.example` in `sitemap.xml` and `robots.txt` with the actual published domain, then commit and push the change and redeploy.

## Important details to confirm before final submission
- The supplied Part 2 files contained `info@freshharvest.co.za`, `012 345 6789` and a Johannesburg location. Confirm these are the correct store contact details before publishing.
- No exact store address was supplied. The contact page therefore shows a Johannesburg map area and explicitly asks visitors to confirm the exact address; do not present it as a verified store pin.
- The product categories and illustrations are demonstration content. Add actual product names, prices and photographs if these are available from the project brief/store.
- A static website cannot send email directly by itself. Netlify Forms collects submissions after deployment; the local fallback creates an email draft that the visitor must send.

## Accessibility and SEO
Each page has a unique title and description, semantic headings, a responsive viewport, descriptive image alt text, keyboard-operable controls and visible form feedback. The project includes a robots file and sitemap template; update the domain placeholders after publishing.
