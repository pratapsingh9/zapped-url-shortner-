import express from "express";
import { Request, Response, NextFunction } from "express";
import { URLController } from "./controllers/URLController.js";
import { URLService } from "./services/URLService.js";
import { URLRepository } from "./repositories/URLRepository.js";
import { validateURL } from "./middleware/validateURL.js";
const app = express();
app.use(express.json());

// Initialize dependencies
const urlRepository = new URLRepository();
const urlService = new URLService(urlRepository);
const urlController = new URLController(urlService);

// Routes
app.post("/shorten", validateURL, (req, res) =>
  urlController.shortenURL(req, res)
);
app.get("/:shortCode", (req, res) => urlController.redirectURL(req, res));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Default error response
  res.status(500).json({
    type: "error",
    message: "Internal Server Error",
  });
});
// export { app };


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});