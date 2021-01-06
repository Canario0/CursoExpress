import * as uuid from "uuid";
import { comparePassword, hashPasswordSync } from "../tools/crypto";
import * as teamsController from "../teams/teams.controller";
import { User } from "../models/user";

const userDatabase: Map<string, User> = new Map();
// userId -> password cifrada

async function registerUser(userName: string, password: string): Promise<void> {
  const hashPassword = hashPasswordSync(password);
  const userUuid = uuid.v4();
  userDatabase.set(userUuid, {
    userName: userName,
    password: hashPassword,
    salt: "asd",
  });
  await teamsController.createTeam(userUuid);
}

async function cleanUserDatabase(): Promise<void> {
  userDatabase.clear();
}

async function getUserNameFromId(uuid: string): Promise<string> {
  const user = userDatabase.get(uuid);
  if (!user) throw new Error("User not found");
  return user.userName;
}

async function getUserIdFromUserName(userName: string): Promise<string> {
  for (let [key, user] of userDatabase) {
    if (user.userName === userName) return key;
  }
  throw new Error("User nor found");
}

async function checkUserCredentials(
  userName: string,
  password: string
): Promise<boolean> {
  const userId = await getUserIdFromUserName(userName);
  let user = userDatabase.get(userId);
  return comparePassword(password, user!.password);
}

export {
  registerUser,
  checkUserCredentials,
  getUserIdFromUserName,
  getUserNameFromId,
  cleanUserDatabase,
};
