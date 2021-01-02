const teamsDatabase: Map<string, string[]> = new Map();

function createTeam(uuid: string): void {
  teamsDatabase.set(uuid, []);
}

function addPokemon(uuid: string, pokemonName: string): string[] | null {
  const team = teamsDatabase.get(uuid);
  if (!team) return null;
  team.push(pokemonName);
  return team;
}

function setTeam(uuid: string, team: string[]): string[] {
  teamsDatabase.set(uuid, team);
  return teamsDatabase.get(uuid)!;
}

function getTeamByUuid(uuid: string): string[] | null {
  return teamsDatabase.get(uuid) || null;
}
export { createTeam, addPokemon, setTeam, getTeamByUuid };
