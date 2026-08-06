import { 
    getAllTrails,
    getTrailBySlug,
    getTrailsByRegionId
 } from "../models/trailModel";
import { getRegionBySlug } from "../models/regionModel";
import type { Request, Response } from 'express';

export async function displayAllTrails(_req: Request, res: Response) {
  const trails = await getAllTrails();
  if (!trails) {
    res.status(404).send("No trails to display");
    return;
  }
  res.render("index.html", {trails: trails});
};

export async function displayTrail(req: Request, res: Response) {
    const slug:string = Array.isArray(req.params.slug) 
        ? req.params.slug[0] ?? "" 
        : req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }
  const trail = await getTrailBySlug(slug);
  if (!trail) {
    res.status(404).send("Trail not found");
    return;
  }
  res.render("trail.html",  trail);
};


export async function displayTrailsByRegion(req: Request, res: Response) {
    const slug:string = Array.isArray(req.params.slug) 
        ? req.params.slug[0] ?? "" 
        : req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }
  const region = await getRegionBySlug(slug);
  if (!region) {
    res.status(404).send("Region for Trails not found");
    return;
  }
  const trail = await getTrailsByRegionId(region.id.toString());
  if (!trail) {
    res.status(404).send("Trail by region-id not found");
    return;
  }
  res.render("trail.html",  trail);
};