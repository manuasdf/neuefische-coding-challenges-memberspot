import { readFile } from "node:fs/promises";
import path from "node:path";

const noteFolder = path.join(process.cwd(), "notes");

export async function readNote(id: string): Promise<string> {
    const filePath = path.join(noteFolder, id);
    const fileContent = await readFile(filePath, { encoding: "utf-16le" });
    return fileContent;
}
