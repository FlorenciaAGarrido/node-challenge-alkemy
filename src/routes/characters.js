const { Router } = require("express");
const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getCharacterById,
  deleteCharacter,
} = require("../controllers/characters");
const {
  postRequestValidations,
  putRequestValidations,
  getAllrequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/characters");

const router = Router();

router.get("/", getAllrequestValidation, getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
router.get("/:id(\\d+)/", getRequestValidation, getCharacterById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);

module.exports = router;
