const { Router, request } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getById,
  deleteUser,
} = require("../controllers/users");
const {
  postRequestValidations,
  putRequestValidations,
  getAllrequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/users");

const router = Router();

router.get("/", getAllrequestValidation, getAllUsers);
router.post("/", postRequestValidations, createUser);
router.put("/:id(\\d+)/", putRequestValidations, updateUser);
router.get("/:id(\\d+)/", getRequestValidation, getById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteUser);

module.exports = router;
