import { Router } from 'express';
import {contact, about, examplePost} from "../controllers/staticController";

const staticRoutes = Router();

staticRoutes.get("/contact", contact);

staticRoutes.get("/about", about);

staticRoutes.get("/example-post", examplePost);

export default staticRoutes;