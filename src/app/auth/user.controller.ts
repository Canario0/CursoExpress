import * as uuid from "uuid";
import { comparePassword, hashPasswordSync } from "../tools/crypto";
import * as teamsController from "../teams/teams.controller";
import { IUserModel, UserModel } from "../models/user";

// userId -> password cifrada

async function registerUser(userName: string, password: string): Promise<void> {
  const hashPassword = hashPasswordSync(password);
  const userUuid = uuid.v4();
  const user: IUserModel = new UserModel({
    userId: userUuid,
    userName: userName,
    password: hashPassword,
  });
  await user.save();
  await teamsController.createTeam(userUuid);
}

async function cleanUserDatabase(): Promise<void> {
  await UserModel.deleteMany({}).exec();
}

async function getUserNameFromId(uuid: string): Promise<IUserModel> {
  const user: IUserModel = await UserModel.findOne({
    userId: uuid,
  }).exec();
  if (user) return user;
  throw new Error("User nor found");
}

async function getUserIdFromUserName(userName: string): Promise<IUserModel> {
  const user: IUserModel = await UserModel.findOne({
    userName: userName,
  }).exec();
  if (user) return user;
  throw new Error("User nor found");
}

async function checkUserCredentials(
  userName: string,
  password: string
): Promise<boolean> {
  const user = await getUserIdFromUserName(userName);
  return comparePassword(password, user!.password);
}

export {
  registerUser,
  checkUserCredentials,
  getUserIdFromUserName,
  getUserNameFromId,
  cleanUserDatabase,
};
