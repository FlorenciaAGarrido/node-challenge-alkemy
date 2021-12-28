const ImageRepository = require("../repositories/imageRepository");
const CharacterRepository = require("../repositories/characterRepository");
const MovieRepository = require("../repositories/movieRepository");
const imageRepository = new ImageRepository();
const characterRepository = new CharacterRepository();
const movieRepository = new MovieRepository();

const uploadCharacterImage = async (idCharacter, file) => {
  const character = await characterRepository.findById(idCharacter);
  const imageURL = await imageRepository.uploadImage(
    character.name,
    file.buffer,
    file.mimetype
  );
  console.log(`Image URL: ${imageURL}`);
  character.image = imageURL;
  return await characterRepository.update(idCharacter, { image: imageURL });
};

const uploadMovieImage = async (idMovie, image) => {
  const movie = await movieRepository.findById(idMovie);
  const imageURL = await imageRepository.uploadImage(movie.title, image);
  movie.image = imageURL;
  return await movieRepository.update(idMovie, movie);
};

module.exports = {
  uploadCharacterImage,
  uploadMovieImage,
};
