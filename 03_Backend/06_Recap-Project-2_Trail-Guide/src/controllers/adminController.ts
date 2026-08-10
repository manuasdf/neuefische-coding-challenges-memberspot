import { getAllRegions } from "../models/regionModel";
import { 
    getAllTrails,
    addTrail,
    getTrailById,
    updateTrail,
    deleteTrail
 } from "../models/trailModel";
import type { Request, Response } from 'express';
import type { Region } from "../models/regionModel";

type TParamId = {
  id: number
}

const REDIRECT = "/admin";

function formatDate(unix: number | undefined): string {
    if (typeof unix === undefined) 
        return ""; 
    return new Date(unix as number * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatRegionsDropdrop(regions: Region[]): (string | number)[][] {
    return regions.map((region: Region) => {
        return [region.id, region.name]
    })
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
  res.render("admin/list.html", {trails: formatedTrails});
};

export async function displayCreateTrailForm(_req: Request, res: Response) {
  const regions = await getAllRegions();
  if (!regions) {
    res.status(404).send("No regions to display. Add a region before adding trails.");
    return;
  }
    res.render("admin/form.html", {regions: formatRegionsDropdrop(regions)});
};

export async function createTrail(req: Request, res: Response) {
    const newTrail = await addTrail(req.body);
    if (!newTrail) {
        res.status(500).json({ error: "Failed to create trail entry" });
        return;
    }
    res.redirect(REDIRECT);
}

export async function displayEditTrailForm(req: Request<TParamId>, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Id not found");
    return;
  }
  const regions = await getAllRegions();
  if (!regions) {
    res.status(404).send("No regions to select. Add a region before editing trails.");
    return;
  }
  const trail = await getTrailById(Number(id));
  if (!trail) {
    res.status(404).send("Trail not found");
    return;
  }
  res.render("admin/form.html", {regions: formatRegionsDropdrop(regions), trail: trail});
}

export async function editTrail(req: Request<TParamId>, res: Response) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Id not found");
        return;
    }
    const trail = await updateTrail(Number(id), req.body);
  if (!trail) {
    res.status(500).json({ error: "Failed to update trail entry" });
    return;
  }
    res.redirect(REDIRECT);
}

export async function removeTrail(req: Request<TParamId>, res: Response) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Id not found");
        return;
    }
    const trail = await deleteTrail(Number(id));
  if (!trail) {
    res.status(500).json({ error: "Failed to delete trail entry" });
    return;
  }
    res.redirect(REDIRECT);
}