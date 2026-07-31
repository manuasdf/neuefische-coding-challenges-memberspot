import { Router } from 'express';
import { listPosts, createPost } from './../controllers/adminController';
const adminRoutes = Router();
/*
* renders a list of all posts with edit and delete buttons next to each entry.
*/
adminRoutes.get("/posts", listPosts);
/*
* renders an empty form for creating a new post.
*/
adminRoutes.get("/posts/new", createPost);
/*
* creates a new post from the form submission and redirects back to /admin.
*/
// adminRoutes.post("/posts", );
/*
* renders a form pre-filled with the existing post data.
*/
// adminRoutes.get("/posts/:slug/edit", );
/*
* saves the edited post and redirects back to /admin.
*/
// adminRoutes.post("/posts/:slug", );
/*
* removes the post and redirects back to /admin.
*/
// adminRoutes.post("/posts/:slug/delete", );
export default adminRoutes;
//# sourceMappingURL=adminRoutes.js.map