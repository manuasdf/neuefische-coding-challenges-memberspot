import fs from "node:fs";
import path from "node:path";
const PAGE_SIZE = 2;
const DATA_PATH = `${process.cwd()}/src/data/`;
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
function fetchData() {
    const postsFilePath = path.join(DATA_PATH, "postData.json");
    const raw = fs.readFileSync(postsFilePath, "utf8");
    const posts = JSON.parse(raw);
    return posts;
}
export function fetchAllPosts(req) {
    const posts = fetchData();
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
export function fetchPost(slug) {
    const posts = fetchData();
    const post = posts.find((p) => slugify(p.title) === slug);
    return {
        post: { ...post, createdAt: formatDate(post.createdAt) },
    };
}
//# sourceMappingURL=postModel.js.map