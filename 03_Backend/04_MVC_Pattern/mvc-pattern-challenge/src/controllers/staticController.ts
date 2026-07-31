import { Response } from "express";

export const contact = (_req: any, res: Response) => {
  res.render("contact.html");
};

export const about = (_req: any, res: Response) => {
  res.render("about.html");
};

export const examplePost = (_req: any, res: Response) => {
  res.render("postExample.html");
};