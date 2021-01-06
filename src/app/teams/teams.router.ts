import express from "express";
import * as teamsDelegate from "./teams.delegate";

const router = express.Router();

router
  .route("/")
  .get(teamsDelegate.getTeamFromUser)
  .put(teamsDelegate.setTeamdFromUser);

router.route("/pokemons/").post(teamsDelegate.setPokemonToTeam);

router.route("/pokemons/:id").delete(teamsDelegate.deletePokemonFromTeam);

export { router };
