"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const node_path_1 = __importDefault(require("node:path"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const noteCreate_1 = require("./model/noteCreate");
const noteRead_1 = require("./model/noteRead");
const noteDelete_1 = require("./model/noteDelete");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(process.cwd() + '/public'));
app.use(express_1.default.json());
const viewsDir = node_path_1.default.join(process.cwd(), "src/views");
nunjucks_1.default.configure(viewsDir, {
    autoescape: true,
    express: app
});
app.get('/', function (req, res) {
    res.render('input.njk');
});
app.get("/:id", async (req, res) => {
    try {
        const fileContent = await (0, noteRead_1.readNote)(req.params.id);
        await (0, noteDelete_1.deleteNote)(req.params.id);
        res.render("output.njk", {
            message: fileContent
        });
    }
    catch (err) {
        res.status(404).send("Note not found");
    }
});
app.post('/', async function (req, res) {
    const { message } = req.body;
    if (message) {
        const cleanMessage = (0, sanitize_html_1.default)(message, {});
        const fileName = await (0, noteCreate_1.saveFile)(cleanMessage);
        res.status(201).json({ success: true, message: "Saved!", filename: fileName });
    }
    else {
        res.status(400).json({ error: "No message provided" });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map