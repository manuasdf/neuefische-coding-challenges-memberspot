import * as _ from "lodash";
 import fs from "node:fs";
import path from "node:path";


 const grouped = _.groupBy(["cat", "dog", "crow"], "length");
// had to run: npm i --save-dev @types/lodash

 const appEnv: string | undefined = process.env.APP_ENV;
const filePath = path.join("data", "volunteers.json");
const raw = fs.readFileSync(filePath, "utf8");


