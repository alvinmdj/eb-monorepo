import { NextFunction, Request, Response } from "express";

import { auth } from "../config/firebaseConfig";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    const decodedToken = await auth.verifyIdToken(token);
    res.locals.userId = decodedToken.uid;

    next();
  }
}
