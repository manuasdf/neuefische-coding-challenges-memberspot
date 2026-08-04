import { Router } from 'express';
import { listPosts, createPostForm, createPost, editPostForm, editPost, removePost } from './../controllers/adminController';
const adminRoutes = Router();
/*
* renders a list of all posts with edit and delete buttons next to each entry.
*/
adminRoutes.get("/posts", listPosts);
/*
* renders an empty form for creating a new post.
*/
adminRoutes.get("/posts/new", createPostForm);
/*
* creates a new post from the form submission and redirects back to /admin.
*/
adminRoutes.post("/posts", createPost);
/*
* renders a form pre-filled with the existing post data.
*/
adminRoutes.get("/posts/:id/edit", editPostForm);
/*
* saves the edited post and redirects back to /admin.
*/
adminRoutes.post("/posts/:id", editPost);
/*
* removes the post and redirects back to /admin.
*/
adminRoutes.post("/posts/:id/delete", removePost);
export default adminRoutes;
//# sourceMappingURL=adminRoutes.js.map