import { unlink } from "node:fs/promises";
import path from "node:path";

const noteFolder = path.join(process.cwd(), "notes");

export async function deleteNote(id: string): Promise<void> {
    const filePath = path.join(noteFolder, id);
    await unlink(filePath);
}
