import * as usersController from "../app/tools/users";

before((done) => {
  usersController.registerUser("test", "123");
  /* console.log("Global before"); */
  done();
});

after((done) => {
  /* console.log("Global after"); */
  usersController.cleanUserDatabase();
  done();
});
