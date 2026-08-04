import type { Request, Response } from 'express';
import { fetchAllPosts, fetchPost } from './../models/postModel';

export async function listPosts(req: Request, res: Response) {
  const posts = await fetchAllPosts(req);
  if (!posts) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("index.html", posts);
};

type TParamSlug = {
  id: string
}

export async function showPost(req: Request<TParamSlug>, res: Response) {
  const id:string = req.params.id;
  if (!id) {
    res.status(400).send("No id provided");
    return;
  }

  const post = await fetchPost(id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("post.html", post);
};
