import * as usersController from "../app/auth/user.controller";

before(async () => {
  await usersController.registerUser("test", "123");
  /* console.log("Global before"); */
});

after(async () => {
  /* console.log("Global after"); */
  await usersController.cleanUserDatabase();
});
