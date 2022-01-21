const { check } = require("express-validator");
const multer = require("multer");
const upload = multer();
const AppError = require("../../errors/appError");
const movieService = require("../../services/movieService");
const characterService = require("../../services/characterService");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");

const _nameRequired = check("name", "Name required").not().isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

const _idRequired = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const cFound = await characterService.findById(id);
  if (!cFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _historyRequired = check("history").not().isEmpty();
const _ageIsNumeric = check("age").optional().isNumeric();
const _weigthIsNumeric = check("weigth").optional().isNumeric();
const _nameNotExist = check("name").custom(async (name = "") => {
  const cFound = await characterService.findByName(name);
  if (cFound) {
    throw new AppError("The name exist in DB", 400);
  }
});

const _idCharacterExist = check("idCharacter").custom(
  async (idCharacter = "", { req }) => {
    const cFound = await characterService.findById(idCharacter);
    if (!cFound) {
      throw new AppError("The character id does not exist in DB", 400);
    }
    req.character = cFound;
  }
);

const _idMovieExist = check("idMovie").custom(async (idMovie = "", { req }) => {
  const mFound = await movieService.findById(idMovie);
  if (!mFound) {
    throw new AppError("The movie id does not exist in DB", 400);
  }
  req.movie = mFound;
});

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _nameNotExist,
  _ageIsNumeric,
  _historyRequired,
  _weigthIsNumeric,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _nameNotExist,
  _idIsNumeric,
  _idExist,
  _ageIsNumeric,
  _weigthIsNumeric,
  _roleValid,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idIsNumeric,
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequired,
  _idIsNumeric,
  _idExist,
  validationResult,
];

const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  _idRequired,
  _idIsNumeric,
  _idExist,
  imageRequired,
  validationResult,
];

const _idMCRequired = (name) => {
  return check(name).not().isEmpty();
};
const _idMCIsNumeric = (name) => {
  return check(name).isNumeric();
};

const asociationRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idMCRequired("idMovie"),
  _idMCIsNumeric("idMovie"),
  _idCharacterExist,
  _idMCRequired("idCharacter"),
  _idMCIsNumeric("idCharacter"),
  _idMovieExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  asociationRequestValidations,
};
