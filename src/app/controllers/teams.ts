import { Pokemon } from "../models/pokemon";

const teamsDatabase: Map<string, Pokemon[]> = new Map();

function createTeam(uuid: string): void {
  teamsDatabase.set(uuid, []);
}

function addPokemon(uuid: string, pokemon: Pokemon): Pokemon[] | null {
  const team = teamsDatabase.get(uuid);
  if (!team) return null;
  team.push(pokemon);
  return team;
}

function setTeam(uuid: string, team: Pokemon[]): Pokemon[] {
  teamsDatabase.set(uuid, team);
  return teamsDatabase.get(uuid)!;
}

function getTeamByUuid(uuid: string): Pokemon[] | null {
  return teamsDatabase.get(uuid) || null;
}
export { createTeam, addPokemon, setTeam, getTeamByUuid };
