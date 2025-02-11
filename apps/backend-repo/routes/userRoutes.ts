import { type Express } from "express";

import { fetchUserHandler, updateUserHandler } from "../controller/api";

export function userRoutes(app: Express) {
  app.get("/fetch-user-data", fetchUserHandler);

  app.put("/update-user-data", updateUserHandler);
}
