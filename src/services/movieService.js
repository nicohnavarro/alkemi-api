import MovieRepository from '../repositories/movieRepository.js';
const repository = new MovieRepository();

const findAll = async() => {
  return await repository.findAll();
}

const findById = async(id) => {
  return await repository.findById(id);
}

const save = async(movie) => {
  return await repository.save(movie);
}

const update = async(id,movie) => {
  return await repository.update(id,movie);
}

const remove = async(id) => {
  return await repository.remove(id);
}

export {
  findAll,
  findById,
  save,
  update,
  remove
}
