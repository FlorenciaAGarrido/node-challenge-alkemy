const ImageRepository = require("../repositories/imageRepository");
const CharacterRepository = require("../repositories/genderTypeRepository");
const MovieRepository = require("../repositories/movieRepository");
const imageRepository = new ImageRepository();
const characterRepository = new CharacterRepository();
const movieRepository = new MovieRepository();

const uploadCharacterImage = async (idCharacter, image) => {
  const character = await characterRepository.findById(idCharacter);
  const imageURL = await imageRepository.uploadImage(character.name, image);
  character.image = imageURL;
  return characterRepository.update(idCharacter, character);
};

const uploadMovieImage = async (idMovie, image) => {
  const movie = await movieRepository.findById(idMovie);
  const imageURL = await imageRepository.uploadImage(movie.title, image);
  movie.image = imageURL;
  return movieRepository.update(idMovie, movie);
};

module.exports = {
  uploadCharacterImage,
  uploadMovieImage,
};
