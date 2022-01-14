const { Router } = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
  uploadMovieImage,
  asocieteCharacter,
} = require("../controllers/movies");
const {
  postRequestValidations,
  putRequestValidations,
  getAllrequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  asociationRequestValidations,
} = require("../middlewares/movies");

const router = Router();

router.get("/", getAllrequestValidation, getAllMovies);
router.post("/", postRequestValidations, createMovie);
router.put("/:id(\\d+)/", putRequestValidations, updateMovie);
router.get("/:id(\\d+)/", getRequestValidation, getMovieById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteMovie);
router.post("/image", postImageRequestValidations, uploadMovieImage);
router.put(
  "/:idMovie(\\d+)/characters/:idCharacter(\\d+)/",
  asociationRequestValidations,
  asocieteCharacter
);

module.exports = router;
