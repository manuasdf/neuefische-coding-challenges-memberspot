import express from "express";
// import { Response } from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, closeDB } from "./models/db";
import websiteRoutes from "./routes/websiteRoutes";

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

app.use("/", websiteRoutes);

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
