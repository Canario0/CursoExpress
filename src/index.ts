import express from "express";
import { router as authRouter } from "./app/auth/auth.router";
import { router as teamsRouter } from "./app/teams/teams.router";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login logic
// De esta manera podemos añadir prefijos a nuestros proyectos
// Puediendolo separar en modulos
app.use("/auth", authRouter);
app.use("/teams", teamsRouter);

app.listen(port, () => console.log("Listening on port " + port));

// Export para testing
export { app };
