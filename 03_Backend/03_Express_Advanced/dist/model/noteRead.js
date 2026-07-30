"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNote = readNote;
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const noteFolder = node_path_1.default.join(process.cwd(), "notes");
async function readNote(id) {
    const filePath = node_path_1.default.join(noteFolder, id);
    const fileContent = await (0, promises_1.readFile)(filePath, { encoding: "utf-16le" });
    return fileContent;
}
//# sourceMappingURL=noteRead.js.map