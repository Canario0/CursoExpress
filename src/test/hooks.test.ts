import * as usersController from "../app/auth/user.controller";
import * as teamsController from "../app/teams/teams.controller";

beforeEach(async () => {
  await usersController.registerUser("test", "123");
  /* console.log("Global before"); */
});

afterEach(async () => {
  /* console.log("Global after"); */
  await teamsController.cleanTeamDataBase();
  await usersController.cleanUserDatabase();
});
