import { access, constants, writeFile } from "node:fs/promises";
import { createHash } from 'crypto';
import path from "node:path";

const noteFolder = path.join(process.cwd(), "notes");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(`${noteFolder}/${filePath}`, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

async function saveFile(text: string): Promise<string> {
    let fileAlreadyExists: boolean = false;
    let randomFileName: string = "";
    do {
        randomFileName = generateRandomHash();
        fileAlreadyExists = await fileExists(randomFileName);
    } while(fileAlreadyExists);

    await writeFile(`${noteFolder}/${randomFileName}`, text, {encoding: 'utf-16le'});
    return randomFileName;
}

function generateRandomHash(): string {
    const randomString = Math.random().toString(36).substring(2);
    return createHash('sha256').update(randomString).digest('hex');
}

export {
    saveFile
}