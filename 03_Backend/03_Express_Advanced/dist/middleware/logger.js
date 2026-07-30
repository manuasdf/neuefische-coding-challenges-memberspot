const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");
async function addLogMessage(message) {
    await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}
export function logger(req, res, next) {
    res.on("finish", async () => {
        const logEntry = [
            new Date().toISOString(),
            req.method,
            req.ip,
            req.originalUrl,
            res.statusCode,
        ].join(" ");
        await addLogMessage(logEntry);
    });
    next();
}
//# sourceMappingURL=logger.js.map