import { Request, Response } from "express";
import { fetchUser, updateUser } from "../repository/userCollection";

export async function fetchUserHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    const user = await fetchUser(userId);

    res.status(200).json({
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function updateUserHandler(
  req: Request<{}, {}, { name: string; hobby: string }>,
  res: Response<{}, { userId: string }>
) {
  try {
    const userId = res.locals.userId;
    const { name, hobby } = req.body;

    if (!name || !hobby) {
      res.status(400).json({
        message: "Name and hobby are required",
      });
    }

    const user = await updateUser(userId, { name, hobby });

    res.status(200).json({
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
