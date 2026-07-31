# Build a burn-on-read service

Build a small Express application with TypeScript that lets one user create a message and another user open it exactly once.

Use the logger from this session as shared infrastructure for the whole app, then add the burn-on-read behavior on top.

Requirements:

* [X] Set up an Express application with TypeScript
* [X] Use Nunjucks for templates
* [X] Add your own CSS or use a small CSS framework
* [X] Provide a text field where the user can enter a message
* [X] Sanitize the input before storing it
* [X] Store the message in a file
* [X] Generate a unique link for the stored message
* [X] Show that link to the sender after creation
* [X] Delete the file after the link is opened once

Useful review questions while building:

* Which part of the app should create the file name or ID?
    * The file name has to be created by the client to be able to create the link that references the file.
    * Or the backend replies with the name that has been created on the backend side. Either is possible.
* Where should files be stored so the path stays predictable?
    * The files should be stored on the server in some subdirectory following the root-dir. process.cwd() is most reliable. 
* What should happen if a user opens an expired or missing link?
    * The page should return a 404. 
* Which requests should appear in the access log for this app?
    * Since this is an app for burn-on-read notes, tbh none. But we probably want to keep error logs that have no information about the user. 
