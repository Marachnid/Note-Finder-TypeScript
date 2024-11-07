import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";

const port: number = 8000;
const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'webapp' directory
app.use(express.static(path.join(__dirname, "..", "webapp")));

// Set the correct MIME type for JavaScript files
app.get("/js/*.js", (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "..", "webapp", req.path);
    res.type("application/javascript").sendFile(filePath);
});

// Handle all routes by serving 'index.html' from 'webapp'
app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "webapp", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});