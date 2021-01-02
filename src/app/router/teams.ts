import express from "express";
import passport from "passport";
import * as authController from "../controllers/auth";
import * as teamsController from "../controllers/teams";
import * as usersController from "../controllers/users";

const router = express.Router();
authController.setupAuth(passport);

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    const team = teamsController.getTeamByUuid(req.user!.userId);
    console.log(team);
    if (team == null) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.status(200).json({
      trainer: usersController.getUserNameFromId(req.user!.userId),
      team,
    });
  })
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: "Missing team data" });
      return;
    }
    if (!req.body.trainer) {
      res.status(400).json({ message: "Missing trainer data" });
      return;
    }
    if (!req.body.team) {
      res.status(400).json({ message: "Missing team data" });
      return;
    }

    res.status(200).json({
      trainer: usersController.getUserNameFromId(req.user!.userId),
      team: teamsController.setTeam(req.user!.userId, req.body.team),
    });
  });

router.route("/pokemons/").post((req, res) => {
  res.status(201).send("Hello world!");
});

router.route("/pokemons/:id").delete((req, res) => {
  res.status(200).send("Hello world!");
});

export { router };
