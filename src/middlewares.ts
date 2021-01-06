import express, { Express } from "express";
import * as authMiddleware from "./app/tools/auth.middleware";

function setUpMiddlewares(app: Express): void {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  authMiddleware.setupAuth();
  app.use(authMiddleware.protectedWithJwt);
}

export { setUpMiddlewares };
