import { default as chai } from "chai";
import { default as chaiHttp } from "chai-http";
import { app } from "../../index";

chai.use(chaiHttp);

describe("Suite de pruebas para auth", () => {
  it("Should return 400 when login whit empty credentials", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .end((err, res) => {
        chai.assert.equal(res.status, 400);
        done();
      });
  });

  it("Should return 400 when login in with invalid credentials", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "tests", password: "123" })
      .end((err, res) => {
        chai.assert.equal(res.status, 400);
        done();
      });
  });

  it("Should return 200 when login in with valid credentials", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.containsAllKeys(res.body, ["token"]);
        done();
      });
  });

  xit("Should return 403", (done) => {
    done();
  });

  it("Should return 401 when no jwt token is available", (done) => {
    chai
      .request(app)
      .get("/teams")
      .end((err, res) => {
        chai.assert.equal(res.status, 401);
        done();
      });
  });

  it("Should return 401 when invalid jwt token is available", (done) => {
    chai
      .request(app)
      .post("/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        chai
          .request(app)
          .get("/teams")
          .set("Authorization", `Bearer ${res.body.token}x`)
          .end((err, res) => {
            chai.assert.equal(res.status, 401);
            done();
          });
      });
  });

  it("Should return 200 when a valid jwt token is available", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        chai
          .request(app)
          .get("/teams")
          .set("Authorization", `Bearer ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            done();
          });
      });
  });
});
