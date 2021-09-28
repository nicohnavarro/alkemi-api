import ContentType from "../models/contentType.js";

class ContentTypeRepository {
  constructor() {}

  async findAll() {
    return await ContentType.findAll();
  }

  async findById(id) {
    return await ContentType.findByPk(id);
  }

  async findByDescription(description) {
    return await ContentType.findOne({ where: { description } });
  }
}

export default ContentTypeRepository;
