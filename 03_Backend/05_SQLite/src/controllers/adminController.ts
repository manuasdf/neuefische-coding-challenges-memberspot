import type { Request, Response } from 'express';
import { fetchAllPosts, fetchPost, insertPost, updatePostById, deletePostById } from './../models/postModel';

type TParamId = {
  id: string
}

const REDIRECT = "/admin/posts/";

export async function listPosts(req: Request, res: Response) {
  const posts = await fetchAllPosts(req);
  if (!posts) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("index.html", {...posts, admin: true});
};

export async function showPost(req: Request<TParamId>, res: Response) {
  const id:string = req.params.id;
  if (!id) {
    res.status(400).send("Invalid id");
    return;
  }
  const post = await fetchPost(id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post.html",  {...post, admin: true});
};

export function createPostForm(_req: Request, res: Response) {
  res.render("adminPostForm.html");
}

export async function createPost(req: Request, res: Response) {
  try {
    const newId = await insertPost(req.body);
    res.redirect(REDIRECT+newId);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog entry" });
  }
}

export async function editPostForm(req: Request<TParamId>, res: Response) {
  const id:string = req.params.id;
  if (!id) {
    res.status(400).send("Invalid id");
    return;
  }
  const post = await fetchPost(id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("adminPostForm.html", post);
}

export async function editPost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await updatePostById(id, req.body);
    res.redirect(REDIRECT+id);
  } catch (err) {
    res.status(500).json({ error: `Failed to update blog entry: ${err}` });
  }
}

export async function removePost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deletePostById(id);
    res.redirect(REDIRECT);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog entry" });
  }
}
