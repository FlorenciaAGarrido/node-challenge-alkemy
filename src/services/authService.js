const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const AppError = require("../errors/appError");
const logger = require("../loaders/logger");
const config = require("../config");

const login = async (email, password) => {
  try {
    //Validacion de email
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Authentication failed! Email / password does not corecct. #1",
        401
      );
    }

    // Validacion de usuario habilitado
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled.", 401);
    }

    //Validacion de password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError(
        "Authentication failed! Email / password does not correct. #2",
        401
      );
    }

    // Generar JWT
    const token = _encrypt(user.id);

    return {
      token,
      user: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

const validToken = async (token) => {
  try {
    // validar que token venga como parametro
    if (!token) {
      throw new AppError("Authentication failed! Token required", 401);
    }

    logger.info(`Token received: ${token}`);

    token = token.replace(/^Bearer\s+/, "");

    //validar que token sea integro
    let id;
    try {
      const obj = jwt.verify(token, config.auth.secret);
      id = obj.id;
    } catch (verifyError) {
      throw new AppError("Authentication failed! Invalid token", 401);
    }

    logger.info(`User id in the token: ${id}`);

    //validar si hay usuario en bd
    const user = await userService.findById(id);
    if (!user) {
      throw new AppError(
        "Authentication failed! Invalid Token - User not found",
        401
      );
    }

    //validar si usuario esta habilitado
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled", 401);
    }

    //retornar el usuario
    return user;
  } catch (err) {
    throw err;
  }
};

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError("Authorization failed! User without privilegies.", 401);
  }
  return true;
};

const register = async (email, password) => {
  const user = { email, password };

  await userService.save(user);

  //TODO: Enviar un mail de confirmacion de registro.

  return "User Registered. You can log in to use the API.";
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = {
  login,
  register,
  validToken,
  validRole,
};
