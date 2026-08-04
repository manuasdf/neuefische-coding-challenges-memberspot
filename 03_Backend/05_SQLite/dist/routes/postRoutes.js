import { Router } from 'express';
import { listPosts, showPost } from './../controllers/postController';
const postRoutes = Router();
postRoutes.get("/", listPosts);
postRoutes.get("/:id", showPost);
export default postRoutes;
//# sourceMappingURL=postRoutes.js.map