"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = saveFile;
const promises_1 = require("node:fs/promises");
const crypto_1 = require("crypto");
const node_path_1 = __importDefault(require("node:path"));
const noteFolder = node_path_1.default.join(process.cwd(), "notes");
async function fileExists(filePath) {
    try {
        await (0, promises_1.access)(`${noteFolder}/${filePath}`, promises_1.constants.W_OK);
        return true;
    }
    catch (_a) {
        return false;
    }
}
async function saveFile(text) {
    let fileAlreadyExists = false;
    let randomFileName = "";
    do {
        randomFileName = generateRandomHash();
        fileAlreadyExists = await fileExists(randomFileName);
    } while (fileAlreadyExists);
    await (0, promises_1.writeFile)(`${noteFolder}/${randomFileName}`, text, { encoding: 'utf-16le' });
    return randomFileName;
}
function generateRandomHash() {
    const randomString = Math.random().toString(36).substring(2);
    return (0, crypto_1.createHash)('sha256').update(randomString).digest('hex');
}
//# sourceMappingURL=noteCreate.js.map