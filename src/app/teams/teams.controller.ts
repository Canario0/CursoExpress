import { ITeamModel, TeamModel } from "../models/team";
import { IPokemonModel } from "../models/pokemon";

async function cleanTeamDataBase(): Promise<void> {
  await TeamModel.deleteMany({}).exec();
}

async function createTeam(uuid: string): Promise<void> {
  const team: ITeamModel = new TeamModel({ userId: uuid, team: [] });
  await team.save();
}

async function getTeamByUuid(uuid: string): Promise<ITeamModel> {
  const team: ITeamModel = await TeamModel.findOne({ userId: uuid });
  if (team == null) throw new Error("Team not found");
  return team;
}

async function setTeam(
  uuid: string,
  pokemons: IPokemonModel[]
): Promise<ITeamModel> {
  const team: ITeamModel = await getTeamByUuid(uuid);
  team.team = pokemons;
  team.save();
  return team;
}

async function addPokemon(
  uuid: string,
  pokemon: IPokemonModel
): Promise<ITeamModel> {
  const team: ITeamModel = await getTeamByUuid(uuid);
  if (team.team.length === 6) throw new Error("Already have 6 pokemon");
  team.team.push(pokemon);
  await team.save();
  return team;
}

async function deletePokemonByPosition(
  uuid: string,
  pokemonNum: number
): Promise<ITeamModel> {
  const team: ITeamModel = await getTeamByUuid(uuid);
  if (!team.team[pokemonNum]) throw new Error("Pokemon not found");
  team.team.splice(pokemonNum, 1);
  team.save();
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
