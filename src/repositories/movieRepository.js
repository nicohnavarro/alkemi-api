import Sequelize from "sequelize";
const { Op } = Sequelize;
import Movie from "../models/movie.js";
import { format } from "date-fns";
import { parseISO } from "date-fns";

class MovieRepository {
  constructor() {}

  async findAll(
    { title = "", calification = "", creationDate = "" },
    { offset, limit, order }
  ) {
    let where = {};

    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (calification) {
      where.calification = {
        [Op.eq]: calification,
      };
    }
    if (creationDate) {
      where.creationDate = {
        [Op.eq]: creationDate,
      };
    }

    let config = {
      where,
      attributes: ["title", "image", "creationDate"],
      order: "",
    };
    if (order) {
      config.order = [order.split(";")];
    }
    return await Movie.findAll(config);
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }

  async findByTitle(title) {
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
