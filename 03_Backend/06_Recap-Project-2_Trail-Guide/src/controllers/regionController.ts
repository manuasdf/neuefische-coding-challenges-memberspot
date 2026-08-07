import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import type { Request, Response } from 'express';

type TParamSlug = {
  slug: string
}

export async function displayAllRegions(_req: Request, res: Response) {
  const regions = await getAllRegions();
  if (!regions) {
    res.status(404).send("No regions to display");
    return;
  }
  res.render("regions.html", {regions: regions});
};

export async function displayRegion(req: Request<TParamSlug>, res: Response) {
  const slug = req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }
  const region = await getRegionBySlug(slug);
  if (!region) {
    res.status(404).send("No region for slug found");
    return;
  }
  res.render("region.html",  {region: region});
};