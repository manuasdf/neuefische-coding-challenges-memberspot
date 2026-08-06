import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import type { Request, Response } from 'express';

export async function displayAllRegions(_req: Request, res: Response) {
  const regions = await getAllRegions();
  if (!regions) {
    res.status(404).send("No regions to display");
    return;
  }
  res.render("regions.html", regions);
};

export async function displayRegion(req: Request, res: Response) {
    const slug:string = Array.isArray(req.params.slug) 
        ? req.params.slug[0] ?? "" 
        : req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }
  const region = await getRegionBySlug(slug);
  if (!region) {
    res.status(404).send("Region not found");
    return;
  }
  res.render("region.html",  region);
};