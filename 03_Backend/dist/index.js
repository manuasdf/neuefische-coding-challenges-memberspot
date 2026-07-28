import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
let bookmarks = [
    { id: 1, url: "https://expressjs.com", title: "Express.js", tag: "node" },
    {
        id: 2,
        url: "https://typescriptlang.org",
        title: "TypeScript",
        tag: "typescript",
    },
    { id: 3, url: "https://developer.mozilla.org", title: "MDN Web Docs" },
];
app.get("/bookmarks", (req, res) => {
    res.json(bookmarks);
});
app.get("/bookmarks/:id", (req, res) => {
    const id = Number(req.params.id);
    const tag = req.query.tag;
    const bookmark = bookmarks.find((entry) => {
        if (tag && entry.tag === tag && entry.id === id) {
            return true;
        }
        if (!tag && entry.id === id) {
            return true;
        }
        return false;
    });
    if (!bookmark) {
        res.status(404).send("Bookmark not found.");
        return;
    }
    res.json(bookmark);
});
app.post("/bookmarks", (req, res) => {
    let error = [];
    if (!req.body.url || req.body.url === "")
        error.push("Missing required field: url.");
    if (!req.body.title || req.body.title === "")
        error.push("Missing required field: title.");
    if (error.length > 0) {
        res.status(400).json({
            "error": error.join(" ")
        });
    }
    const lastBookmark = bookmarks.slice(-1)[0];
    const lastId = Number(lastBookmark?.id);
    const newBookmark = { id: lastId + 1, ...req.body };
    bookmarks.push(newBookmark);
    res.status(201).json(newBookmark);
});
app.delete("/bookmarks/:id", (req, res) => {
    const id = Number(req.params.id);
    bookmarks = bookmarks.filter((entry) => entry.id !== id);
    res.status(204).send();
});
app.patch("/bookmarks/:id", (req, res) => {
    const update = req.body;
    const id = Number(req.params.id);
    const indexOfBookmark = bookmarks.findIndex((entry) => entry.id === id);
    if (indexOfBookmark === -1) {
        res.send(404).send("Bookmark not found.");
    }
    bookmarks[indexOfBookmark] = { ...bookmarks[indexOfBookmark], ...update };
    res.status(200).json(bookmarks[indexOfBookmark]);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map