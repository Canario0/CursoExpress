import express from "express";
import passport from "passport";
import * as authController from "../controllers/auth";
import * as teamsController from "../controllers/teams";
import * as usersController from "../controllers/users";
import axios from "axios";

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

router
  .route("/pokemons/")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: "Missing pokemon's name data" });
      return;
    }
    if (!req.body.name) {
      res.status(400).json({ message: "Missing pokemon's name data" });
      return;
    }
    const pokemonName: string = req.body.name;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(function (response) {
        // handle success
        teamsController.addPokemon(req.user!.userId, {
          name: pokemonName,
          pokedexNum: response.data.id,
        });
        res.status(201).json({
          trainer: usersController.getUserNameFromId(req.user!.userId),
          team: teamsController.getTeamByUuid(req.user!.userId),
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        res.status(400).json({ message: error });
      });
  });

router
  .route("/pokemons/:id")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    const uuid = req.user!.userId;
    const finalTeam = teamsController.deletePokemonByPosition(
      uuid,
      Number(req.params.id)
    );
    if (finalTeam == null) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.status(204).send();
  });

export { router };
