import Character from "./character.js";
import ContentType from "./contentType.js";
import GenderType from "./genderType.js";
import Movie from "./movie.js";
import CharacterMovie from "./characterMovie.js";

const relations = () => {
  Movie.belongsToMany(Character, {
    through: CharacterMovie,
    as: "characters",
    foreignKey: "movieId",
  });

  Character.belongsToMany(Movie, {
    through: CharacterMovie,
    as: "movies",
    foreignKey: "characterId",
  });

  ContentType.hasMany(Movie, {
    as: "movies",
    foreignKey: "contentTypeId",
  });

  GenderType.hasMany(Movie, {
    foreignKey: "genderTypeId",
    sourceKey: "id",
  });
};

export default relations;
