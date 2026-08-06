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
* [ ] anyone visiting the root URL can browse all trails,
* [ ] click into a trail detail page,
* [ ] and browse trails grouped by region. 
* [ ] Every page extends the same base layout. 
* [ ] Trail listings reuse a single Nunjucks macro.

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
* [ ] Type the route params using Express generics (Request<{ slug: string }>) so the controller stays type-safe.

Views:

* [ ] Build views/index.html, views/trail.html, views/regions.html, and views/region.html. Each one extends base.html and fills the content block.
* [ ] Build views/macros/trailCard.html with a single trailCard(trail) macro that renders one trail as a pico.css <article> with a difficulty badge and a link to its detail page. Use this macro in both the home page and the region detail page.
* [ ] Keep formatting concerns (turning created_at into a readable date) in a util function that is used in the controller, not in the model or the template.
* [ ] Use Backend MVC Pattern for the controller signature and the routes-to-controller mapping, and to Backend Template Engines for macros and extends/block.

Request logger:

* [ ] Add middleware/logger.ts that writes one line per request to logs/access.log after the response finishes. Each line should include timestamp, method, URL, and status.
* [ ] Register it in app.ts before the routers so it captures every request, including the API and admin routes you add later.
* [ ] Use Backend Express Advanced for the logger middleware example with res.on("finish", ...).

### Admin panel

### Public API
