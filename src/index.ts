import express from "express";
import { router as authRouter } from "./app/auth/auth.router";
import { router as teamsRouter } from "./app/teams/teams.router";
import { setUpMiddlewares } from "./middlewares";
import * as db from "./database";

const app = express();
const port = 3000;
db.setUpDataBase();
setUpMiddlewares(app);

// De esta manera podemos añadir prefijos a nuestros proyectos
// Puediendolo separar en modulos
app.use("/auth", authRouter);
app.use("/teams", teamsRouter);

app.listen(port, () => console.log("Listening on port " + port));

// Export para testing
export { app };
