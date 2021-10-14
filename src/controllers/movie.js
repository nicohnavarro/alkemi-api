import {
  findAll,
  findById,
  save,
  update,
  remove,
  associate
} from "../services/movieService.js";
import Success from "../handlers/successHandler.js";
import LoggerInstance from "../loaders/logger/index.js";
import { uploadMovieImage } from "../services/imageService.js";
/**
 *
 * @params {express.Request} req
 * @params {express.Response} res
 */
const getAllMovies = async (req, res, next) => {
  try {
    LoggerInstance.info("Query: " + JSON.stringify(req.query));
    const { filter = {}, options = {} } = req.query;
    const movies = await findAll(filter, options);
    res.status(200).json(new Success(movies));
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await findById(id);
    res.status(200).json(new Success(movie));
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    let movie = req.body;
    movie = await save(movie);
    res.status(201).json(new Success(movie));
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    let movie = req.body;
    movie.id = id;
    movie = await update(id, movie);
    res.json(new Success(movie));
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await remove(id);
    res.json(new Success(movie));
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
    const movieId = req.body.id;
    const image = req.file;

    res.json(new Success(await uploadMovieImage(movieId, image)));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const associateCharacter = async (req, res, next) => {
  try {
    const movie = req.movie;
    const character = req.character;
    res.json(new Success(await associate(movie, character)));
  } catch (err) {
    next(err);
  }
};

export {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage,
  associateCharacter,
};
