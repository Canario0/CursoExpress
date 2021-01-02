import { default as chai } from "chai";
import { default as chaiHttp } from "chai-http";
import { Pokemon } from "../app/models/pokemon";
import { app } from "../index";

chai.use(chaiHttp);

describe("Test suite for teams endpoint", () => {
  it("Get should return the team of the given user", (done) => {
    const team = [{ name: "Charizar" }, { name: "Blastoise" }];
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
                chai.assert.lengthOf(res.body.team, 2);
                chai.assert.equal(res.body.team[0].name, team[0].name);
                chai.assert.equal(res.body.team[1].name, team[1].name);
                done();
              });
          });
      });
  });

  it("Put should update my team", (done) => {
    const team = [{ name: "Pikachu" }];
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
            chai.assert.lengthOf(res.body.team, 1);
            chai.assert.equal(res.body.team[0].name, team[0].name);
            done();
          });
      });
  });

  it("Post new pokemon, should add it to my team", (done) => {
    const pokemonName = "Bulbasaur";
    chai
      .request(app)
      .post("/auth/login")
      .type("json")
      .send({ user: "test", password: "123" })
      .end((err, res) => {
        chai
          .request(app)
          .post("/teams/pokemons/")
          .set("Authorization", `Bearer ${res.body.token}`)
          .type("json")
          .send({ name: pokemonName })
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            chai.assert.equal(res.body.trainer, "test");
            chai.assert.exists(res.body.team);
            const pokemonInfo = res.body.team.find(
              (pokemon: Pokemon) => pokemon.name === pokemonName
            );
            chai.assert.exists(pokemonInfo, "Pokemon not found in the team");
            chai.assert.equal(pokemonInfo.pokedexNum, 1);
            done();
          });
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
