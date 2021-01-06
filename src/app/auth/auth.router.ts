import express from "express";
import * as authDelegate from "./auth.delegate";

export const router = express.Router();

router.route("/login").post(authDelegate.login);
