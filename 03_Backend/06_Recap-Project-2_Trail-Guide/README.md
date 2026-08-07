# Recap Project 2 - Guide Trail

The project is a small directory of hiking trails called Trail Guide. Visitors browse trails on a public website. An admin user manages the catalog through a separate set of routes with HTML forms. External developers can read and write data through a JSON API.

## Challenges

The project is broken into four chunks: setup and database, public website, admin panel, public API.

### Setup and database

The data model has two tables. A regions table holds the area each trail belongs to, like “Bavarian Alps” or “Scottish Highlands”. A trails table holds individual trails and references its region through a foreign key. This one-to-many relationship is what gives you something to join: every trail page and every API response that returns a trail also includes the region’s name and country.

* [x] Initialize a new npm project, install express, nunjucks, sqlite, sqlite3, sanitize-html, and the matching @types/* packages plus tsx and typescript as dev dependencies.
* [x] Add a tsconfig.json and an npm dev script that runs tsx watch src/app.ts.
* [x] Create an .env file holding PORT, DB_PATH, and API_KEY, plus a committed .env.example. Load it with tsx --env-file=.env (see the environment variables material from Backend Express Advanced).
* [x] Set up the folder structure so the rest of the project has somewhere to land.
* [x] download the data folder including an empty database and the seed file.
* [x] Then add a script called db:seed to your package.json.
* [x] Add a views/base.html Nunjucks template with <header>, a <main> content block, and <footer>. Include pico.css from its CDN in the <head>.
* [x] Configure Nunjucks against the views/ folder in app.ts and set views as the view engine.
* [x] Serve public/ as a static directory for any images or extra CSS you add later. 
* [x] Refer to Backend Template Engines for the extends/block setup.
* [x] Look at the downloaded seed.sql file. It includes a database reset, table creation and data seeding for both tables.
* [x] Run your db:seed script you created earlier to initialize the database with some dummy data. Since we know now that the database is setup correctly, we don’t need to add a CREATE TABLE IF NOT EXISTS statement in our dbConnect function later.
* [X] Build src/models/db.ts with connectDB, getDB, and closeDB, reading the file path from process.env.DB_PATH.
* [X] Call connectDB() in app.ts before app.listen().
* [X] Register SIGINT and SIGTERM handlers that call closeDB() before exiting.

### Public website

Styling is handled by pico.css, a class-less CSS framework. You add it once via a CDN link in your base template, then write plain semantic HTML — <header>, <nav>, <article>, <form>, <table> — and pico styles it for you. There is no design work to do beyond writing correct markup.

The goal of this part is the read-only public site. By the end; 
* [x] anyone visiting the root URL can browse all trails,
* [x] click into a trail detail page,
* [X] and browse trails grouped by region. 
* [x] Every page extends the same base layout. 
* [x] Trail listings reuse a single Nunjucks macro.

Models:

* [X] In models/regionModel.ts, expose getAllRegions() and getRegionBySlug(slug).
* [X] In models/trailModel.ts, expose getAllTrails(), getTrailBySlug(slug), and getTrailsByRegionId(regionId). 
* [X] Each function that returns a trail should INNER JOIN regions on trails.region_id so the result includes region_name and region_country alongside the trail columns.
* [X] Use parameterized queries for every value coming from the URL or a request body. Do not interpolate strings into SQL.
* [X] Use Backend SQL Basics for the typed db.all<T[]> and db.get<T> patterns, and to Backend SQL Advanced for INNER JOIN syntax.

Routes and controllers:

* [X] Create routes/websiteRoutes.ts with these routes, each mapped to a named controller function in controllers/trailController.ts or controllers/regionController.ts:
    * [X] GET / lists all trails on the home page
    * [X] GET /trails/:slug shows a single trail with its region info
    * [X] GET /regions lists all regions
    * [X] GET /regions/:slug shows a single region with its trails
* [X] Mount the router in app.ts at the root path.
* [x] Type the route params using Express generics (Request<{ slug: string }>) so the controller stays type-safe.

Views:

* [x] Build views/index.html, views/trail.html, views/regions.html, and views/region.html. Each one extends base.html and fills the content block.
* [x] Build views/macros/trailCard.html with a single trailCard(trail) macro that renders one trail as a pico.css <article> with a difficulty badge and a link to its detail page. Use this macro in both the home page and the region detail page.
* [x] Keep formatting concerns (turning created_at into a readable date) in a util function that is used in the controller, not in the model or the template.
* [x] Use Backend MVC Pattern for the controller signature and the routes-to-controller mapping, and to Backend Template Engines for macros and extends/block.

Request logger:

* [x] Add middleware/logger.ts that writes one line per request to logs/access.log after the response finishes. Each line should include timestamp, method, URL, and status.
* [x] Register it in app.ts before the routers so it captures every request, including the API and admin routes you add later.
* [x] Use Backend Express Advanced for the logger middleware example with res.on("finish", ...).

### Admin panel

The goal of this part is HTML-form-based CRUD for trails: 
* [X] By the end, an editor can list, create, edit, and delete trails through 
* [X] a separate set of pages mounted at /admin. 
* [X] The admin panel reuses the model functions from part 2 and adds three more for the write paths.

Routes and controllers:

* [x] Create routes/adminRoutes.ts mounted at /admin, with handlers in controllers/adminController.ts:
    * [X] GET /admin lists all trails with edit and delete buttons
    * [X] GET /admin/trails/new and POST /admin/trails
    * [X] GET /admin/trails/:id/edit and POST /admin/trails/:id
    * [X] POST /admin/trails/:id/delete
* [X] Each POST handler responds with a redirect back to /admin after the model call succeeds.
* [X] For the add and edit forms, render a select drop down list of all available regions in the template. Make sure to get the regions from the database and render the select based on this data.

Models:

Add:
* [x] getTrailById(id), 
* [x] addTrail(data), 
* [x] updateTrail(id, data), and 
* [x] deleteTrail(id) to trailModel.ts. 
* [x] Use parameterized queries for every column. Make sure to update the slug based on the new title.

Form parsing and sanitization:

* [x] Register express.urlencoded({ extended: true }) in app.ts so req.body is populated for form submissions.

Views:

* [X] Build views/admin/list.html (table of trails with action buttons) and 
* [X] views/admin/form.html (one form reused for both create and edit). Both extend base.html.

Refer to Backend MVC Pattern’s admin CRUD challenge for the same pattern applied to a blog. The shape is identical here, only the entity changes.

### Public API

The goal of this part is the JSON surface at /api. 
* [X] Read endpoints are open to anyone. 
* [ ] Write endpoints require an x-api-key header that matches the value in .env. 
* [X] Controllers reuse the same model functions you already wrote — only the response format changes.

Routes and controllers:

* [X] Create routes/apiRoutes.ts mounted at /api, with handlers split between controllers/apiTrailController.ts and controllers/apiRegionController.ts:
    * [X] GET /api/trails returns all trails. Support optional ?region=<slug> and ?difficulty=<easy|moderate|hard> filters via req.query.
    * [X] GET /api/trails/:slug returns a single trail joined with its region, or 404 if missing.
    * [X] GET /api/regions returns all regions.
    * [X] GET /api/regions/:slug/trails returns the trails belonging to one region, or 404 if the region does not exist.
    * [X] POST /api/trails creates a trail from a JSON body. Respond with 201 and the created resource.
    * [X] PATCH /api/trails/:id updates the given fields. Respond with 200 and the updated resource, or 404.
    * [X] DELETE /api/trails/:id deletes the trail. Respond with 204, or 404 if it does not exist.
* [X] Register express.json() in app.ts.

API key middleware:

* [X] Add middleware/apiKey.ts. 
* [X] The middleware reads req.header("x-api-key") and compares it to process.env.API_KEY. 
* [X] If the header is missing or does not match, respond with 401 and a JSON error body. Otherwise call next().
* [X] Apply the middleware only to the write endpoints, not to the read endpoints. The cleanest way is to attach it directly to the POST, PATCH, and DELETE route definitions inside apiRoutes.ts.

Validation and status codes:

* [X] Reject create and update bodies that are missing required fields with 400 and a JSON error message. A simple field-by-field check is enough — there is no need to introduce a validation library.
* [X] Respond with 404 whenever a slug does not match an existing record.
* [x] Respond with 204 for successful deletes (no body).

Refer to Backend Basics and Express for the status code conventions and res.status().json(), and to Backend Express Advanced for the middleware signature and next().