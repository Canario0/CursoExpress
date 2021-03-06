import { Request, Response } from "express";
import * as usersController from "./user.controller";
import * as jwt from "jsonwebtoken";
import { IUser } from "../models/user";

async function login(req: Request, res: Response): Promise<void> {
  if (!req.body || !req.body.password || !req.body.user) {
    res.status(400).json({ message: "Missing credentials" });
    return;
  }
  try {
    const validCredentials = await usersController.checkUserCredentials(
      req.body.user,
      req.body.password
    );
    if (validCredentials) {
      const user: IUser = <IUser>(
        await usersController.getUserIdFromUserName(req.body.user)
      );
      const token = jwt.sign({ userId: user.userId }, process.env.SECRET!);
      res.status(200).json({
        token: token,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }
  res.status(400).json({ message: "Invalid credentials" });
}

export { login };
