import GenderType from "../models/genderType.js";

class GenderTypeRepository {
  constructor() {}

  async findAll() {
    return await GenderType.findAll();
  }

  async findById(id) {
    return await GenderType.findByPk(id);
  }

  async findByDescription(description) {
    return await GenderType.findOne({ where: { description } });
  }
}

export default GenderTypeRepository;
