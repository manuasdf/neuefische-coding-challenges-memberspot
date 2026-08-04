import { getDB } from "./../db/database";
const PAGE_SIZE = 2;
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}
function formatDate(unix) {
    if (typeof unix === undefined)
        return "";
    return new Date(unix * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
export async function fetchAllPosts(req) {
    const db = getDB();
    const posts = await db.all("SELECT * FROM blog_entries");
    const authorFilter = typeof req.query.author === "string" ? req.query.author.trim() : "";
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";
    const page = typeof req.query.page === "string" &&
        Number.isInteger(Number(req.query.page))
        ? Math.max(1, Number(req.query.page))
        : 1;
    const filteredPosts = authorFilter
        ? posts.filter((post) => post.author.toLowerCase().includes(authorFilter.toLowerCase()))
        : posts;
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sort === "oldest") {
            return a.createdAt - b.createdAt;
        }
        return b.createdAt - a.createdAt;
    });
    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);
    const view = pagedPosts.map((post) => ({
        ...post,
        slug: slugify(post.title),
        reatedAt: formatDate(post.createdAt),
    }));
    return {
        posts: view,
        controls: {
            author: authorFilter,
            sort,
            page: currentPage,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    };
}
export async function fetchPost(id) {
    const db = getDB();
    const [post] = await db.all("SELECT * FROM blog_entries WHERE id = ?", [id]);
    return {
        post: { ...post, createdAt: formatDate(post.createdAt) },
    };
}
export async function insertPost(entry) {
    const db = getDB();
    const result = await db.run(`INSERT INTO blog_entries (title, teaser, author, createdAt, image, content)
     VALUES (@title, @teaser, @author, @createdAt, @image, @content)`, {
        "@title": entry.title,
        "@teaser": entry.teaser,
        "@author": entry.author,
        "@createdAt": Date.now(),
        "@image": entry.image,
        "@content": entry.content,
    });
    return result.lastID;
}
export async function updatePostById(id, entry) {
    const db = getDB();
    await db.run(`UPDATE blog_entries
     SET title = @title, teaser = @teaser, author = @author, createdAt = @createdAt, image = @image, content = @content
     WHERE id = @id`, {
        "@title": entry.title,
        "@teaser": entry.teaser,
        "@author": entry.author,
        "@createdAt": Date.now(),
        "@image": entry.image,
        "@content": entry.content,
        "@id": id,
    });
}
export async function deletePostById(id) {
    const db = getDB();
    await db.run(`DELETE FROM blog_entries WHERE id = @id`, { "@id": id });
}
//# sourceMappingURL=postModel.js.map