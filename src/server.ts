require("express-async-errors");
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppError } from "./utils/AppError";
import { routes } from "./routes";
import { UPLOADS_FOLDER } from "./configs/upload";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  return res
    .status(500)
    .json({ status: error, message: "Internal server error" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
