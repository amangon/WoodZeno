# TODO - WoodZeno CMS + Routes + API

## Step 1: Inspect & fix navigation
- [x] Update Header.jsx desktop links to /home, /about, /products, /contact


## Step 2: Add missing pages (routes)
- [x] Create app/home/page.js
- [x] Create app/about/page.js
- [x] Create app/products/page.js
- [x] Create app/contact/page.js
- [x] Update app/page.js to render the Home composition (or redirect to /home)


## Step 3: Add products API for Postman
- [x] Create app/api/products/route.js (GET, POST)
- [x] Create app/api/products/[id]/route.js (DELETE)
- [x] Add seed file app/data/products.json with current products


## Step 4: Build CMS UI (must match site UI)
- [x] Create app/Components/cms/Cms.jsx
- [x] Create app/Components/cms/cms.css
- [x] Create app/cms/page.js to render CMS
- [x] CMS: list products, Add product form, Remove product button (connect to local API)





## Step 5: Make Products component dynamic
- [x] Update app/Components/Products.jsx to fetch from external API
- [x] Keep existing filters + wishlist behavior




## Step 6: Verification
- [x] Run npm run dev
- [x] Test in browser: /home /about /products /contact /cms

- [x] Test Postman: GET/POST/DELETE /api/products



