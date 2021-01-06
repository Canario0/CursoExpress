import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { enviroment } from "../../enviroments/enviroment";

function setupAuth(passport: PassportStatic): void {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: enviroment.secret,
  };
  passport.use(
    new JwtStrategy(options, (decoded, done) => {
      /* console.log("decoded jwt", decoded); */
      // Cuando lo tengamos todo implementado deberíamos devolver done con el usuario
      // y los errores
      return done(null, decoded);
    })
  );
}

export { setupAuth };
