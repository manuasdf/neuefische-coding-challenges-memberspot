import { Router } from 'express';
import { 
    returnAllTrails,
    returnTrail,
    returnAllTrailsByRegion,
    createTrail,
    editTrail,
    removeTrail
} from '../controllers/apiTrailController';
import { 
    returnAllRegions 
} from '../controllers/apiRegionController';
import { auth } from '../middleware/apiKey';

const apiRoutes = Router();

/* 
* GET /api/trails returns all trails. Support optional ?region=<slug> and ?difficulty=<easy|moderate|hard> filters via req.query.
*/
apiRoutes.get("/trails", returnAllTrails);

/* 
* GET /api/trails/:slug returns a single trail joined with its region, or 404 if missing.
*/
apiRoutes.get("/trails/:slug", returnTrail);

/* 
* GET /api/regions returns all regions.
*/
apiRoutes.get("/regions", returnAllRegions);

/* 
* GET /api/regions/:slug/trails returns the trails belonging to one region, or 404 if the region does not exist.
*/
apiRoutes.get("/regions/:slug/trails", returnAllTrailsByRegion);

/* 
* POST /api/trails creates a trail from a JSON body. Respond with 201 and the created resource.
*/
apiRoutes.post("/trails", auth, createTrail);

/* 
* PATCH /api/trails/:id updates the given fields. Respond with 200 and the updated resource, or 404.
*/
apiRoutes.patch("/trails/:id", auth, editTrail);

/* 
* DELETE /api/trails/:id deletes the trail. Respond with 204, or 404 if it does not exist.
*/
apiRoutes.delete("/trails/:id", auth, removeTrail);

export default apiRoutes;