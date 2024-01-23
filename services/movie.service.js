const deleteFile = require('../helpers/deleteFile.helper');
const { Movie } = require('../models');
const { relative } = require('path');

// * Movie
const selectAllMovies = async (where) => {
  const movieInstance = await Movie.findAll({
    where,
  });

  return {
    success: true,
    message: 'Successfully Getting All Movies',
    content: movieInstance,
  };
};

const selectMovie = async (where) => {
  const movieInstance = await Movie.findOne({
    where,
  });
  if (!movieInstance) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }

  return {
    success: true,
    message: 'Successfully Getting Data Movie',
    content: movieInstance,
  };
};

const insertMovie = async (form) => {
  const movieInstance = await Movie.create(form);

  return {
    success: true,
    message: 'Movie Successfully Created',
    content: movieInstance,
  };
};

const updateMovie = async (id, form) => {
  const movieInstance = await Movie.findOne({ where: { id } });
  if (!movieInstance) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }

  if (form.image) {
    await deleteFile(relative(__dirname, movieInstance.image));
  }
  movieInstance.title = form.title || movieInstance.title;
  movieInstance.description = form.description || movieInstance.description;
  movieInstance.rating = form.rating || movieInstance.rating;
  movieInstance.image = form.image || movieInstance.image;
  await movieInstance.save();

  return {
    success: true,
    message: 'Movie Successfully Updated',
    content: movieInstance,
  };
};

const deleteMovie = async (id) => {
  // check identity type id validity
  const movieInstance = await Movie.findOne({ where: { id } });
  if (!movieInstance) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }

  await deleteFile(relative(__dirname, movieInstance.image));
  await movieInstance.destroy();

  return {
    success: true,
    message: 'Movie Successfully Deleted',
    content: `Movie Successfully Deleted`,
  };
};

module.exports = {
  selectAllMovies,
  selectMovie,
  insertMovie,
  updateMovie,
  deleteMovie,
};
