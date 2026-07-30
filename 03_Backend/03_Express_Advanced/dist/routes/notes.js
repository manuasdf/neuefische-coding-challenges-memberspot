"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes = void 0;
const express_1 = require("express");
const noteCreate_1 = require("../model/noteCreate");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const notes = (0, express_1.Router)();
exports.notes = notes;
const notesFolder = node_path_1.default.join(process.cwd(), "notes");
notes.get("/:id", async (req, res) => {
    try {
        const fileContent = await (0, promises_1.readFile)(node_path_1.default.join(notesFolder, req.params.id), { encoding: "utf-16le" });
        res.render("output.njk", {
            message: fileContent,
            backToTxLink: "/"
        });
    }
    catch (err) {
        res.status(404).send("Note not found");
    }
});
notes.post('/', async function (req, res) {
    const { message } = req.body;
    if (message) {
        const fileName = await (0, noteCreate_1.saveFile)(message);
        res.status(201).json({ success: true, message: "Saved!", filename: fileName });
    }
    else {
        res.status(400).json({ error: "No message provided" });
    }
});
//# sourceMappingURL=notes.js.map