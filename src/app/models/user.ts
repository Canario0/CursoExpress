import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserModel extends Document {
  userId: string;
  userName: string;
  password: string;
}

interface IUser {
  userId: IUserModel["userId"];
  userName: IUserModel["userName"];
  password: IUserModel["password"];
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel: Model<IUserModel> = mongoose.model("UserModel", UserSchema);

export { IUser, IUserModel, UserModel };
