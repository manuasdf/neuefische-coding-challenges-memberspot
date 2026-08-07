import { 
    getAllTrails,
    getTrailBySlug,
    getTrailsByRegionId
 } from "../models/trailModel";
import { getRegionBySlug } from "../models/regionModel";
import type { Request, Response } from 'express';

type TParamSlug = {
  slug: string
}

function formatDate(unix: number | undefined): string {
    if (typeof unix === undefined) 
        return ""; 
    return new Date(unix as number * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export async function displayAllTrails(_req: Request, res: Response) {
  const trails = await getAllTrails();
  if (!trails) {
    res.status(404).send("No trails to display");
    return;
  }
  const formatedTrails = trails.map((trail) => ({
        ...trail,
        created_at: formatDate(trail.created_at)
    }));
  res.render("index.html", {trails: formatedTrails});
};

export async function displayTrail(req: Request<TParamSlug>, res: Response) {
  const slug = req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }
  const trail = await getTrailBySlug(slug);
  if (!trail) {
    res.status(404).send("No trail for slug found");
    return;
  }
  const formatedTrail = {
        ...trail,
        created_at: formatDate(trail.created_at)
    };
  res.render("trail.html",  {trail: formatedTrail});
};


export async function displayTrailsByRegion(req: Request<TParamSlug>, res: Response) {
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
  const trails = await getTrailsByRegionId(region.id.toString());
  if (!trails) {
    res.status(404).send("No trail for region-id found");
    return;
  }
  const formatedTrails = trails.map((trail) => ({
        ...trail,
        created_at: formatDate(trail.created_at)
    }));
  res.render("region.html",  {region: region, trails: formatedTrails});
};