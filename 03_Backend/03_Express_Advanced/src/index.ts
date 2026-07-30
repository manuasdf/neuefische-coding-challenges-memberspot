import express from "express";
import nunjucks from 'nunjucks';
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { saveFile } from "./model/noteCreate";
import { readNote } from "./model/noteRead";
import { deleteNote } from "./model/noteDelete";

const app = express();
const port = 3000;

app.use(express.static(process.cwd() + '/public'));

app.use(express.json());

const viewsDir = path.join(process.cwd(), "src/views");
nunjucks.configure(viewsDir, {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
    res.render('input.njk');
});

app.get("/:id", async (req, res) => {
    try {
        const fileContent = await readNote(req.params.id);
        await deleteNote(req.params.id);
        res.render("output.njk", {
            message: fileContent
        });
    } catch (err) {
        res.status(404).send("Note not found");
    }
})

app.post('/', async function(req, res) {
    const { message } = req.body;
    if (message) {
        const cleanMessage = sanitizeHtml(message, {});
        const fileName = await saveFile(cleanMessage);
        res.status(201).json({ success: true, message: "Saved!", filename: fileName });
    } else {
        res.status(400).json({ error: "No message provided" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
