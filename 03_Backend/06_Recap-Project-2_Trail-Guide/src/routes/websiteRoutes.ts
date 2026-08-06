import { Router } from 'express';
import { 
    displayAllTrails,
    displayTrail,
    displayTrailsByRegion
} from './../controllers/trailController';
import { 
    displayAllRegions,
} from './../controllers/regionController';

const websiteRoutes = Router();

/* 
* GET / lists all trails on the home page
*/
websiteRoutes.get("/", displayAllTrails);

/* 
* GET /trails/:slug shows a single trail with its region info
*/
websiteRoutes.get("/trails/:slug", displayTrail);

/* 
* GET /regions lists all regions
*/
websiteRoutes.get("/regions", displayAllRegions);

/* 
* GET /regions/:slug shows a single region with its trails
*/
websiteRoutes.post("/regions/:slug", displayTrailsByRegion);

export default websiteRoutes;