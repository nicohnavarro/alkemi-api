import {
  findAll,
  findById,
  save,
  update,
  remove,
} from "../services/characterService.js";
import {uploadCharacterImage} from '../services/imageService.js'
import Success from "../handlers/successHandler.js";

/**
 *
 * @params {express.Request} req
 * @params {express.Response} res
 */
const getAllCharacters = async (req, res, next) => {
  try {
    const {filter={},options={}} = req.query; 
    const characters = await findAll(filter,options);
    res.status(200).json(new Success(characters));
  } catch (err) {
    next(err);
  }
};

const getCharacterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await findById(id);
    res.status(200).json(new Success(character));
  } catch (err) {
    next(err);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    let character = req.body;
    character = await save(character);
    res.status(201).json(new Success(character));
  } catch (err) {
    next(err);
  }
};

const updateCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    let character = req.body;

    const characterUpdated = await update(id, character);

    res.json(new Success(characterUpdated));
  } catch (err) {
    next(err);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await remove(id);
    res.json(new Success(character));
  } catch (err) {
    next(err);
  }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
 const uploadImage = async (req, res, next) => {
  try {

      const characterId = req.body.id;
      const image = req.file;
      console.log(req.file)

      res.json(new Success(await uploadCharacterImage(characterId, image)));
  } catch (err) {
      next(err);
  }
};

export {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  uploadImage
};
