import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";

const port: number = 8000;
const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//send files from webapp directory
app.use(express.static(path.join(__dirname, "..", "webapp")));

//set type for js files
app.get("/js/*.js", (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "..", "webapp", req.path);
    res.type("application/javascript").sendFile(filePath);
});

//routing to index.html
app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "webapp", "index.html"));
});

//initialize server
app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});