# Changelog

All notable project changes are recorded here. Dates use YYYY-MM-DD.

## [Part 3] - 2026-11-02

### Added
- Added a responsive, consistent navigation header and footer across all website pages, including a mobile navigation toggle and current-page indication.
- Added the enquiry page with fields for contact details, enquiry category, product/subject and message. Required fields, email format, message length and optional telephone format are validated.
- Added the general contact form with name, email, optional telephone, message type and full message fields.
- Added Netlify Forms attributes and hidden honeypot fields to both forms so submissions can be collected after Netlify deployment. Added a local-preview `mailto:` fallback that compiles the entered information into an email draft addressed to `info@freshharvest.co.za`.
- Added JavaScript product search, category filtering, alphabetical sorting and a live result count on the products page.
- Added an accessible product-image lightbox with close button, backdrop click, Escape-key support and focus return to the image button.
- Added expandable FAQ accordion controls with `aria-expanded` state.
- Added a responsive OpenStreetMap embed centred on the Johannesburg area. It is labelled as an area map because no verified street address was supplied.
- Added original local SVG illustrations for fruit, vegetables, dairy, bakery, pantry and household categories.
- Added `robots.txt`, `sitemap.xml` template and project documentation.

### Changed
- Reorganised the stylesheet into `css/style.css` and JavaScript into `js/main.js` so all pages use consistent, correctly resolved paths.
- Rebuilt the home, about, products and contact page layouts to use consistent Fresh Harvest Grocery branding, semantic page structure and responsive styling.
- Added unique page titles, meta descriptions, relevant keywords, language metadata, favicon links, semantic headings and descriptive image alternative text.
- Added responsive layouts, keyboard focus styles, skip links, reduced-motion support and form status announcements.
- Updated the footer year to populate automatically using JavaScript.

### Corrected
- Corrected inconsistent stylesheet paths in the original files (`style.css` was stored in the project root while pages referenced a missing `css/style.css`).
- Corrected navigation links that pointed to missing `index.html`/`pages/` paths by establishing one consistent project structure.
- Replaced the original `images.html` reference to a JPEG that was not included in the supplied ZIP with local SVG product artwork used by the gallery.
- Removed duplicate/ambiguous product-page files in favour of the single `pages/products.html` page.

### Notes
- The sitemap and robots file contain a domain placeholder that must be replaced with the final published domain after deployment.
- Netlify Forms requires deployment and form notification configuration in the Netlify dashboard. The static local preview cannot deliver form submissions to an inbox; its fallback opens an email draft for the visitor to send.
- Existing contact details from the supplied source files have been retained but should be verified before public release.
