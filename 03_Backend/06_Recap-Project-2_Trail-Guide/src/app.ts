import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, closeDB } from "./models/db";
import websiteRoutes from "./routes/websiteRoutes";
import adminRoutes from "./routes/adminRoutes";
import apiRoutes from "./routes/apiRoutes";
import { ensureLogFile, logger } from "./middleware/logger";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "public", "assets");
const cssDir = path.join(projectRoot, "public", "css");
const viewsDir = path.join(projectRoot, "views");

app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));
app.use(express.urlencoded({ extended: true }));

nunjucks.configure(viewsDir, { 
  autoescape: true, 
  express: app 
});

await ensureLogFile();
app.use(logger);
app.use(express.json());

app.use("/", websiteRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

const port = Number(process.env.PORT) || 3000;

await connectDB();
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
