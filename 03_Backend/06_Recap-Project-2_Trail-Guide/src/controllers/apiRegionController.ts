import { getAllRegions } from "../models/regionModel";
import type { Request, Response } from 'express';

export async function returnAllRegions(_req: Request, res: Response) {
  const regions = await getAllRegions();
  if (!regions) {
    res.status(404).send("No regions to display");
    return;
  }
  res.status(200).json(regions);
}