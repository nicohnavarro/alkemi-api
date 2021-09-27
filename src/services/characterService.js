import CharacterRepository from '../repositories/characterRepository.js';
const repository = new CharacterRepository();

const findAll = async() => {
  return await repository.findAll();
}

const findById = async(id) => {
  return await repository.findById(id);
}

const findByName = async(name) => {
  return await repository.findByName(name);
}

const save = async(character) => {
  return await repository.save(character);
}

const update = async(id,character) => {
  return await repository.update(id,character);
}

const remove = async(id) => {
  return await repository.remove(id);
}

export {
  findAll,
  findById,
  findByName, 
  save,
  update,
  remove
}
