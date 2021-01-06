import * as uuid from "uuid";
import { comparePassword, hashPasswordSync } from "./crypto";
import * as teamsController from "../teams/teams.controller";
import { User } from "../models/user";

const userDatabase: Map<string, User> = new Map();
// userId -> password cifrada

function registerUser(userName: string, password: string) {
  const hashPassword = hashPasswordSync(password);
  const userUuid = uuid.v4();
  userDatabase.set(userUuid, {
    userName: userName,
    password: hashPassword,
    salt: "asd",
  });
  teamsController.createTeam(userUuid);
}

function cleanUserDatabase(): void {
  userDatabase.clear();
}

function getUserNameFromId(uuid: string): string | null {
  const user = userDatabase.get(uuid);
  if (!user) return null;
  return user.userName;
}

function getUserIdFromUserName(userName: string): string | null {
  for (let [key, user] of userDatabase) {
    if (user.userName === userName) return key;
  }
  return null;
}

function checkUserCredentials(
  userName: string,
  password: string,
  done: (err: Error, same: boolean) => void
): void {
  const userId = getUserIdFromUserName(userName);
  if (userId != null) {
    let user = userDatabase.get(userId);
    comparePassword(password, user!.password, done);
  } else {
    done({ name: "Missing User", message: "User not found" }, false);
  }
}

export {
  registerUser,
  checkUserCredentials,
  getUserIdFromUserName,
  getUserNameFromId,
  cleanUserDatabase,
};
