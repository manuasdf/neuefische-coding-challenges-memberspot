import express from "express";
import { Response } from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, closeDB } from "./db/database";
import postRoutes from "./routes/postRoutes";
import staticRoutes from './routes/staticRoutes';
import adminRoutes from "./routes/adminRoutes";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");
const viewsDir = path.join(projectRoot, "src", "views");

app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));
app.use(express.urlencoded({ extended: true })); 

nunjucks.configure(viewsDir, { autoescape: true, express: app });

app.get('/', function (_req, res: Response) {
    res.redirect('/posts');
});
app.use("/", staticRoutes);
app.use("/posts", postRoutes);
app.use("/admin", adminRoutes);

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
