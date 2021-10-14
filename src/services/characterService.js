import CharacterRepository from "../repositories/characterRepository.js";
const repository = new CharacterRepository();
import ImageRepository from "../repositories/imageRepository.js";
const imageRepository = new ImageRepository();

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const findById = async (id) => {
  return await repository.findById(id);
};

const findByName = async (name) => {
  return await repository.findByName(name);
};

const save = async (character) => {
  return await repository.save(character);
};

const update = async (id, character) => {
  return await repository.update(id, character);
};

const remove = async (id) => {
  const character = await repository.findById(id);
  imageRepository.deleteImage(character.image);
  return await repository.remove(id);
};

export { findAll, findById, findByName, save, update, remove };
