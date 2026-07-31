import { Router } from 'express';
import { listPosts, showPost } from './../controllers/postController';

const postRoutes = Router();

postRoutes.get("/", listPosts);

postRoutes.get("/:slug", showPost);

export default postRoutes;