import { Request, Response } from "express";
import * as usersController from "./user.controller";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../../enviroments/enviroment";

function login(req: Request, res: Response): void {
  if (!req.body || !req.body.password || !req.body.user) {
    res.status(400).json({ message: "Missing credentials" });
    return;
  }
  usersController.checkUserCredentials(
    req.body.user,
    req.body.password,
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const userId = usersController.getUserIdFromUserName(req.body.user);
      const token = jwt.sign({ userId: userId }, enviroment.secret);
      res.status(200).json({
        token: token,
      });
    }
  );
}

export { login };
