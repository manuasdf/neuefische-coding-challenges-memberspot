import { fetchAllPosts, fetchPost } from './../models/postModel';
export async function listPosts(req, res) {
    const posts = await fetchAllPosts(req);
    if (!posts) {
        res.status(404).send("Post not found");
        return;
    }
    console.log(posts);
    res.render("index.html", posts);
}
;
export async function showPost(req, res) {
    const id = req.params.id;
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
}
;
//# sourceMappingURL=postController.js.map