import { Request, Response } from "express";
import * as usersController from "../auth/user.controller";
import * as teamsController from "./teams.controller";
import axios from "axios";
import { IUser } from "../models/user";
import { ITeam } from "../models/team";
import { IPokemon, IPokemonModel, PokemonModel } from "../models/pokemon";

async function getTeamFromUser(req: Request, res: Response): Promise<void> {
  try {
    const team = <ITeam>await teamsController.getTeamByUuid(req.user!.userId);
    const user = <IUser>(
      await usersController.getUserNameFromId(req.user!.userId)
    );
    res.status(200).json({
      trainer: user.userName,
      team: team.team,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function setTeamdFromUser(req: Request, res: Response): Promise<void> {
  if (!req.body) {
    res.status(400).json({ message: "Missing team data" });
    return;
  }
  try {
    const pokemons = req.body.map(
      (pokemon: IPokemon) => new PokemonModel(pokemon)
    );
    const team: ITeam = <ITeam>(
      await teamsController.setTeam(req.user!.userId, pokemons)
    );
    const user = <IUser>(
      await usersController.getUserNameFromId(req.user!.userId)
    );
    res.status(200).json({
      trainer: user.userName,
      team: team.team,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

async function setPokemonToTeam(req: Request, res: Response): Promise<void> {
  if (!req.body) {
    res.status(400).json({ message: "Missing pokemon's name data" });
    return;
  }
  if (!req.body.name) {
    res.status(400).json({ message: "Missing pokemon's name data" });
    return;
  }
  const pokemonName: string = req.body.name;
  try {
    const pokemonData = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    try {
      const pokemon: IPokemonModel = new PokemonModel({
        name: pokemonName,
        pokedexNum: pokemonData.data.id,
      });
      await teamsController.addPokemon(req.user!.userId, pokemon);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
      return;
    }
    try {
      const team: ITeam = <ITeam>(
        await teamsController.getTeamByUuid(req.user!.userId)
      );
      const user = <IUser>(
        await usersController.getUserNameFromId(req.user!.userId)
      );
      res.status(201).json({
        trainer: user.userName,
        team: team.team,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting team after the pokemon was added",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
}

async function deletePokemonFromTeam(
  req: Request,
  res: Response
): Promise<void> {
  const uuid = req.user!.userId;
  try {
    await teamsController.deletePokemonByPosition(uuid, Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export {
  getTeamFromUser,
  setTeamdFromUser,
  setPokemonToTeam,
  deletePokemonFromTeam,
};
