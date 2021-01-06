import { Request, Response } from "express";
import * as usersController from "../auth/user.controller";
import * as teamsController from "./teams.controller";
import axios from "axios";

function getTeamFromUser(req: Request, res: Response): void {
  const team = teamsController.getTeamByUuid(req.user!.userId);
  if (team == null) {
    res.status(404).json({ message: "Team not found" });
    return;
  }
  res.status(200).json({
    trainer: usersController.getUserNameFromId(req.user!.userId),
    team,
  });
}

function setTeamdFromUser(req: Request, res: Response): void {
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
}

function setPokemonToTeam(req: Request, res: Response): void {
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
      res.status(400).json({ message: error });
    });
}

function deletePokemonFromTeam(req: Request, res: Response): void {
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
}

export {
  getTeamFromUser,
  setTeamdFromUser,
  setPokemonToTeam,
  deletePokemonFromTeam,
};
