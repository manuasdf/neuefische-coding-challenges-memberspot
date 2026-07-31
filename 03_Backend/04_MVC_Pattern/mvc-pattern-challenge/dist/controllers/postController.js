import { fetchAllPosts, fetchPost } from './../models/postModel';
export function listPosts(req, res) {
    const posts = fetchAllPosts(req);
    if (!posts) {
        res.status(404).send("Post not found");
        return;
    }
    res.render("post.html", posts);
}
;
export function showPost(req, res) {
    const slug = req.params.slug;
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
}
;
//# sourceMappingURL=postController.js.map