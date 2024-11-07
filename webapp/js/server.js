import express from "express";
import { fileURLToPath } from "url";
import path from "path";
const port = 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "webapp")));
app.get("/js/*.js", (req, res) => {
    const filePath = path.join(__dirname, "..", "webapp", req.path);
    res.type("application/javascript").sendFile(filePath);
});
app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "webapp", "index.html"));
});
app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});
