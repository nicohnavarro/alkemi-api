import AppError from "../errors/appError.js";
import Character from "../models/character.js";
import Sequelize from "sequelize";
const { Op } = Sequelize;

class CharacterRepository {
  constructor() {}

  async findAll(
    { name = "", age = "",weight="", movieTitle = "" },
    { offset, limit, order }
  ) {
    let where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (age) {
      where.age = {
        [Op.eq]: age,
      };
    }
    if (weight) {
      where.weight = {
        [Op.eq]: weight,
      };
    }
    // if (movieTitle) {
    //   where.movieTitle = {
    //     [Op.like]: `%${movieTitle}%`,
    //   };
    // }

    let config = {
      where,
      attributes: ["name", "age", "weight"],
      order: "",
    };
    if (order) {
      config.order = [order.split(";")];
    }
    return await Character.findAll(config);
  }

  async findById(id) {
    return await Character.findByPk(id);
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async save(character) {
    try {
      return await Character.create(character);
    } catch (err) {
      throw new AppError("Already save", 400);
    }
  }

  async update(id, character) {
    return await Character.update(character, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await Character.destroy({
      where: {
        id,
      },
    });
  }
}

export default CharacterRepository;
