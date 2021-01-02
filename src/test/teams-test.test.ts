import { default as chai } from "chai";
import { default as chaiHttp } from "chai-http";
import { app } from "../index";

chai.use(chaiHttp);

describe("Test suite for teams endpoint", () => {
  it("Get should return the team of the given user", (done) => {
    const team = ["Charizar", "Blastoise"];
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        const token = res.body.token;
        chai
          .request(app)
          .put("/teams")
          .set("Authorization", `Bearer ${token}`)
          .type("json")
          .send({ trainer: "test", team: team })
          .end((err, res) => {
            chai
              .request(app)
              .get("/teams")
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                // has a team with charizar and blastoise
                // {trainer: name, team: [pkemons]}
                chai.assert.equal(res.status, 200);
                chai.assert.equal(res.body.trainer, "test");
                chai.assert.exists(res.body.team);
                chai.assert.ok(
                  team.every((pokemon) => res.body.team.includes(pokemon)),
                  "Expect teams to be equals"
                );
                /* chai.assert.ok(res.body.team.includes("Blastoise")); */
                done();
              });
          });
      });
  });

  it("Put should update my team", (done) => {
    const team = ["Pkiachu"];
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        chai
          .request(app)
          .put("/teams")
          .set("Authorization", `Bearer ${res.body.token}`)
          .type("json")
          .send({ trainer: "test", team: team })
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.equal(res.body.trainer, "test");
            chai.assert.exists(res.body.team);
            chai.assert.ok(
              team.every((pokemon) => res.body.team.includes(pokemon)),
              "Expect teams to be equals"
            );
            done();
          });
      });
  });

  it("Post new pokemon, should add it to my team", (done) => {
    chai
      .request(app)
      .post("/teams/pokemons")
      .type("json")
      .send({})
      .end((err, res) => {
        chai.assert.equal(res.status, 201);
        done();
      });
  });
  it("Delete a pokemon, should remove it from my team", (done) => {
    chai
      .request(app)
      .delete("/teams/pokemons/1")
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        done();
      });
  });
});
