import { Pokemon } from "../models/pokemon";

const teamsDatabase: Map<string, Pokemon[]> = new Map();

async function cleanTeamDataBase(): Promise<void> {
  teamsDatabase.forEach((_, key) => teamsDatabase.set(key, []));
}

async function createTeam(uuid: string): Promise<void> {
  teamsDatabase.set(uuid, []);
}

async function addPokemon(uuid: string, pokemon: Pokemon): Promise<Pokemon[]> {
  const team = teamsDatabase.get(uuid);
  if (team == null) throw new Error("Team not found");
  team.push(pokemon);
  return team;
}

async function setTeam(uuid: string, team: Pokemon[]): Promise<Pokemon[]> {
  teamsDatabase.set(uuid, team);
  return teamsDatabase.get(uuid)!;
}

async function getTeamByUuid(uuid: string): Promise<Pokemon[]> {
  const team = teamsDatabase.get(uuid);
  if (team == null) throw new Error("Team not found");
  return team!;
}

async function deletePokemonByPosition(
  uuid: string,
  pokemonNum: number
): Promise<Pokemon[]> {
  const team = teamsDatabase.get(uuid);
  if (!team) throw new Error("Team not found");
  team.splice(pokemonNum, 1);
  return team;
}

export {
  createTeam,
  addPokemon,
  setTeam,
  getTeamByUuid,
  cleanTeamDataBase,
  deletePokemonByPosition,
};
