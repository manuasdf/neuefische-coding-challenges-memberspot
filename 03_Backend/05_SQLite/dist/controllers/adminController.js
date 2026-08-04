import { fetchAllPosts, fetchPost, insertPost, updatePostById, deletePostById } from './../models/postModel';
const REDIRECT = "/post/";
export function listPosts(req, res) {
    const posts = fetchAllPosts(req);
    if (!posts) {
        res.status(404).send("Post not found");
        return;
    }
    res.render("post.html", { ...posts, admin: true });
}
;
// export function showPost(req: Request<TParamId>, res: Response) {
//   const id:string = req.params.id;
//   if (!id) {
//     res.status(400).send("Invalid id");
//     return;
//   }
//   const post = fetchPost(id);
//   if (!post) {
//     res.status(404).send("Post not found");
//     return;
//   }
//   res.render("post.html", post);
// };
export function createPostForm(_req, res) {
    res.render("adminPostForm.html");
}
export async function createPost(req, res) {
    let newId = null;
    try {
        newId = await insertPost(req.body);
        res.status(201).json({ id: newId });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create blog entry" });
    }
    res.redirect(REDIRECT + newId);
}
export async function editPostForm(req, res) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid id");
        return;
    }
    const post = fetchPost(id);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    res.render("adminPostForm.html", post);
}
export async function editPost(req, res) {
    const id = Number(req.params.id);
    try {
        await updatePostById(id, req.body);
        res.status(200).json({ message: "Blog entry updated" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update blog entry" });
    }
    res.redirect(REDIRECT + id);
}
export async function removePost(req, res) {
    const id = Number(req.params.id);
    try {
        await deletePostById(id);
        res.status(200).json({ message: "Blog entry deleted" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete blog entry" });
    }
    res.redirect(REDIRECT + id);
}
//# sourceMappingURL=adminController.js.map