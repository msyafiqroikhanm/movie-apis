const { Movie } = require('../models');

// * Movie
const selectAllMovies = async (where) => {
  const movieInstance = await Movie.findAll({
    where,
    order: [
      ['locationId', 'ASC'],
      ['name', 'ASC'],
    ],
  });

  return {
    success: true,
    message: 'Successfully Getting All Movie',
    content: movieInstance,
  };
};

const selectMovie = async (where) => {
  const locationType = await Movie.findOne({
    where,
  });
  if (!locationType) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }

  return {
    success: true,
    message: 'Successfully Getting All Movie',
    content: locationType,
  };
};

const createMovie = async (form) => {
  const locationInstance = await ACM_Location.findOne({ where: { id: form.locationId } });
  if (!locationInstance) {
    return {
      success: false,
      code: 404,
      message: ['Location Data Not Found'],
    };
  }

  //* Unique By Name and Location Check
  const Movie = await Movie.findOne({
    where: { locationId: locationInstance.id, name: { [Op.substring]: form.name } },
  });
  if (Movie) {
    return {
      success: false,
      code: 400,
      message: ['Movie Already Exists'],
    };
  }

  const movieInstance = await Movie.create({
    name: form.name,
    locationId: form.locationId,
  });

  return {
    success: true,
    message: 'Movie Successfully Created',
    content: movieInstance,
  };
};

const updateMovie = async (where, form) => {
  // check identity type id validity
  const movieInstance = await Movie.findOne({ where });
  if (!movieInstance) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }

  if (form.locationId) {
    const locationInstance = await ACM_Location.findOne({ where: { id: form.locationId } });
    if (!locationInstance) {
      return {
        success: false,
        message: ['Location Data Not Found'],
      };
    }
  }

  movieInstance.locationId = form.locationId;
  movieInstance.name = form.name;
  await movieInstance.save();

  return {
    success: true,
    message: 'Movie Successfully Updated',
    content: movieInstance,
  };
};

const deleteMovie = async (where) => {
  // check identity type id validity
  const bedInstance = await Movie.findOne({ where });
  if (!bedInstance) {
    return {
      success: false,
      message: ['Movie Data Not Found'],
    };
  }
  // * Update dependencies data
  await ACM_Room.update({ bedId: null }, { where: { bedId: bedInstance.id } });

  const { name } = bedInstance.dataValues;

  await bedInstance.destroy();

  return {
    success: true,
    message: 'Movie Successfully Deleted',
    content: `Movie ${name} Successfully Deleted`,
  };
};

module.exports = {
  selectAllMovies,
  selectMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
