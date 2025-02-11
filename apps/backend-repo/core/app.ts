import express from "express";
import cors from "cors";

import { onRequest } from "firebase-functions/v2/https";

import authMiddleware from "../middleware/authMiddleware";
import { userRoutes } from "../routes/userRoutes";

export const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(authMiddleware);

userRoutes(app);

export const api = onRequest(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
