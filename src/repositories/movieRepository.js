import Movie from "../models/movie.js";

class MovieRepository {
  constructor() {}

  async findAll() {
    return await Movie.findAll();
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }

  async findByTitle(id) {
    return await Movie.findOne({ where: { title } });
  }

  async save(movie) {
    return await Movie.create(movie);
  }

  async update(id, movie) {
    return await Movie.update(movie, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await Movie.destroy({
      where: {
        id,
      },
    });
  }
}

export default MovieRepository;
