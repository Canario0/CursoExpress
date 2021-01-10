import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserModel } from "./user";
import { IPokemonModel, PokemonSchema } from "./pokemon";

interface ITeamModel extends Document {
  userId: IUserModel["userId"];
  team: IPokemonModel[];
}

interface ITeam {
  userId: ITeamModel["userId"];
  team: ITeamModel["team"];
}

const TeamSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: "UserModel" },
  team: [{ type: PokemonSchema }],
});

const TeamModel: Model<ITeamModel> = mongoose.model("TeamModel", TeamSchema);

export { ITeam, ITeamModel, TeamModel };
