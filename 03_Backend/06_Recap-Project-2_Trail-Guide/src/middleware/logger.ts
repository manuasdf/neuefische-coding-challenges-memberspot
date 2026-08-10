import type { NextFunction, Request, Response } from "express";
import path from "node:path";
import { access, constants, writeFile } from "node:fs/promises";
import { appendFile } from "node:fs/promises";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "access.log");


async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureLogFile(): Promise<void> {
  const exists = await fileExists(LOG_FILE);
  if (!exists) {
    await writeFile(LOG_FILE, "", { encoding: "utf-8" });
  }
}

async function logger(req: Request, res: Response, next: NextFunction) {
    if (!fileExists(LOG_FILE))
        next();
    res.on("finish", async () => {
    const logEntry = [
        new Date().toISOString(),
        req.method,
        req.ip,
        req.originalUrl,
        res.statusCode,
        "\n"
    ].join(" ");
        await appendFile(LOG_FILE, logEntry, { encoding: "utf-8" });
    });
    next();
}

export {
    logger,
    ensureLogFile
}