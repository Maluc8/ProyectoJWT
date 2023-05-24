import passport from "passport";
import local from "passport-local";
import UserManager from "../managers/userManager";
import { createHash, isValidPassword } from "../utils/index";

const localEstrategy = local.Strategy;

export const register = async (req, res) => {
  try {
    const manager = new UserManager();
    let user = await manager.getOneByEmail(req.body.email);
    if (user.id) {
      return done, false;
    }
    const dto = {
      ...req.body,
      password: await createHash(req.body.password),
    };
    let result = await manager.create(dto);
    return done(null, result);
  } catch (e) {
    done("Error al obtener el usuario: ", e);
  }
  res.send({ status: "success", message: "User registered." });
};

export const login2 = new localEstrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const manager = new UserManager();
      let user = await manager.getOneByEmail(username);
      if (!user.id) return done(null, false);
      if (await isValidPassword(password, user.password))
        return done(null, false);
      return done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

const initializePassport = () => {
  passport.use("register", register);
  passport.use("login2", login2);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (user, done) => {
    const manager = new UserManager();
    let user = await manager.getOne(id);
    done(null, user);
  });
};

export default initializePassport;
