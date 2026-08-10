import { Router } from 'express';
import { 
    displayAllTrails,
    displayCreateTrailForm,
    createTrail,
    displayEditTrailForm,
    editTrail,
    removeTrail
} from '../controllers/adminController';

const adminRoutes = Router();

/* 
* GET /admin lists all trails with edit and delete buttons
*/
adminRoutes.get("/", displayAllTrails);

/* 
* GET /admin/trails/new and POST /admin/trails
*/
adminRoutes.get("/trails/new", displayCreateTrailForm);
adminRoutes.post("/trails", createTrail);

/* 
* GET /admin/trails/:id/edit and POST /admin/trails/:id
*/
adminRoutes.get("/trails/:id/edit", displayEditTrailForm);
adminRoutes.post("/trails/:id", editTrail);

/* 
* POST /admin/trails/:id/delete
*/
adminRoutes.post("/trails/:id/delete", removeTrail);

export default adminRoutes;