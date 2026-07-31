import type { Request, Response } from 'express';
import { fetchAllPosts, fetchPost } from './../models/postModel';

export function listPosts(req: Request, res: Response) {
  const posts = fetchAllPosts(req);
  if (!posts) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post.html", {...posts, admin: true});
};

type TParamSlug = {
  slug: string
}

export function showPost(req: Request<TParamSlug>, res: Response) {
  const slug:string = req.params.slug;
  if (!slug) {
    res.status(400).send("Invalid slug");
    return;
  }

  const post = fetchPost(slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("post.html", post);
};

export function createPost(_req: Request, res: Response) {
  res.render("adminNewPost.html");
}
