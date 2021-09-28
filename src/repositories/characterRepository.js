import AppError from "../errors/appError.js";
import Character from "../models/character.js";

class CharacterRepository {
  constructor() {}

  async findAll() {
    return await Character.findAll();
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
    console.log(id);
    console.log(character);
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
