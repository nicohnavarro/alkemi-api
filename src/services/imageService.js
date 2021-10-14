import ImageRepository from "../repositories/imageRepository.js";
const imageRepository = new ImageRepository();
import CharacterRepository from "../repositories/characterRepository.js";
const characterRepository = new CharacterRepository();
import MovieRepository from "../repositories/movieRepository.js";
const movieRepository = new MovieRepository();

const uploadCharacterImage = async (idCharacter, file) => {
  const character = await characterRepository.findById(idCharacter);
  if (character.image) {
    await imageRepository.deleteImage(character.image);
  }

  const imageURL = await imageRepository.uploadImage(
    character.name,
    file.buffer,
    file.mimetype
  );
  character.image = imageURL;
  return characterRepository.update(idCharacter, { image: imageURL });
};

const uploadMovieImage = async (idMovie, file) => {
  const movie = await movieRepository.findById(idMovie);
  if (movie.image) {
    await movieRepository.deleteImage(movie.image);
  }
  const imageURL = await imageRepository.uploadImage(
    movie.title,
    file.buffer,
    file.mimetype
  );
  return await movieRepository.update(idMovie, { image: imageURL });
};

export { uploadCharacterImage, uploadMovieImage };
