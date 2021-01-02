import * as uuid from "uuid";
import { comparePassword, hashPasswordSync } from "./crypto";
import * as teamsController from "./teams";

interface User {
  userName: string;
  password: string;
  salt: string;
}

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
};