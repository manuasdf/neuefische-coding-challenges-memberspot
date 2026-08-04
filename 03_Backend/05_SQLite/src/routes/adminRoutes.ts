import { Router } from 'express';
import { listPosts, showPost, createPostForm, createPost, editPostForm, editPost, removePost } from './../controllers/adminController';

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
* renders a list of all posts with edit and delete buttons next to each entry.
*/
adminRoutes.get("/posts/:id", showPost);

/* 
* creates a new post from the form submission and redirects back to /admin.
*/
adminRoutes.post("/posts", createPost);

/* 
* renders a form pre-filled with the existing post data.
*/
adminRoutes.get("/posts/:id/edit", editPostForm);

/* 
* removes the post and redirects back to /admin.
*/
adminRoutes.post("/posts/:id/delete", removePost);

/* 
* saves the edited post and redirects back to /admin.
*/
adminRoutes.post("/posts/:id", editPost);

export default adminRoutes;