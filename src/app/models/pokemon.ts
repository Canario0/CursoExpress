import mongoose, { Document, Model, Schema } from "mongoose";

interface IPokemonModel extends Document {
  name: string;
  pokedexNum: number;
}

interface IPokemon {
  name: IPokemonModel["name"];
  pokedexNum: IPokemonModel["pokedexNum"];
}

const PokemonSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    pokedexNum: { type: String, required: true },
  },
  { _id: false }
);

const PokemonModel: Model<IPokemonModel> = mongoose.model(
  "PokemonModel",
  PokemonSchema
);

export { IPokemon, IPokemonModel, PokemonSchema, PokemonModel };
