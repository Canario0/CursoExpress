import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

function setupAuth(): void {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET!,
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

function protectedWithJwt(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.path == "/auth/login") {
    return next();
  }
  return passport.authenticate("jwt", { session: false })(req, res, next);
}

export { setupAuth, protectedWithJwt };
