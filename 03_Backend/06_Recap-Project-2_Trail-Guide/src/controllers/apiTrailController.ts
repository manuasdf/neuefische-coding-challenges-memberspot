import { getRegionBySlug } from "../models/regionModel";
import { addTrail, deleteTrail, getAllTrails, getAllTrailsApplyFilter, getTrailBySlug, getTrailsByRegionId, updateTrail } from "../models/trailModel";
import type { Request, Response } from 'express';
import type { Filter, Difficulty } from "../models/trailModel";

type TParamSlug = {
  slug: string
}
type TParamId = {
  id: string
}

function validateRequiredFields(req: Request) {
    let errorMessage: string[] = [];
    if (!req.body.title)
        errorMessage.push("Title is required.");
    if (!req.body.image_url)
        errorMessage.push("Image URL is required.");
    if (!req.body.description)
        errorMessage.push("Description is required.");
    if (!req.body.distance_km)
        errorMessage.push("Distance in KM is required.");
    if (!req.body.region_id)
        errorMessage.push("Region-ID is required.");
    if (!( req.body.difficulty === "easy"
        || req.body.difficulty === "moderate"
        || req.body.difficulty === "hard"))
        errorMessage.push("Difficulty as (easy|moderate|hard) is required.");
    if (errorMessage.length > 0) {
        return JSON.stringify({
            "error": "Missing required field",
            "errorMessage": errorMessage
        })    
    } else {
        return undefined;
    }
}

export async function returnAllTrails(req: Request, res: Response) {
    const { region, difficulty } = req.query;
    if (region || difficulty) {
        const validatedDifficulty = difficulty && ["easy", "moderate", "hard"].includes(difficulty as string)
        ? difficulty as Difficulty
        : undefined;
        const filter: Filter = {
            region: region as string | undefined,
            difficulty: validatedDifficulty
        };
        const trails = await getAllTrailsApplyFilter(filter);
        if (!trails) {
            res.status(404).send("No trails found");
            return;
        }
        res.status(200).json(trails);
    } else {
        const trails = await getAllTrails();
        if (!trails) {
            res.status(404).send("No trails found");
            return;
        }
        res.status(200).json(trails);
    }
};

export async function returnTrail(req: Request<TParamSlug>, res: Response) {
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
  res.status(200).json(trail);
};

export async function returnAllTrailsByRegion(req: Request<TParamSlug>, res: Response) {
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
    res.status(200).json(trails);
};

export async function createTrail(req: Request, res: Response) {
    const validation = validateRequiredFields(req);
    if (validation) {
        res.status(400).json(validation);
    }
    const newTrail = await addTrail(req.body);
    if (!newTrail) {
        res.status(500).json({ error: "Failed to create trail entry" });
        return;
    }
    res.status(201).json(newTrail);
}

export async function editTrail(req: Request<TParamId>, res: Response) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid Id");
        return;
    }
    const validation = validateRequiredFields(req);
    if (validation) {
        res.status(400).json(validation);
    }
    const trail = await updateTrail(Number(id), req.body);
    if (!trail) {
        res.status(500).json({ error: "Failed to update trail entry" });
        return;
    }
    res.status(200).json(trail);
}

export async function removeTrail(req: Request<TParamId>, res: Response) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid Id");
        return;
    }
    const trail = await deleteTrail(Number(id));
    if (!trail) {
        res.status(500).json({ error: "Failed to delete trail entry" });
        return;
    }
    res.status(204).send("OK");
}
