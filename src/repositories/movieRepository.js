const { Op } = require("sequelize");
const Movie = require("../models/movies");
const GenderType = require("../models/genderTypes");
const { parseISO } = require("date-fns");

class MovieRepository {
  constructor() {}

  //todo: implementar filtro
  async findAll({ title, calification, creationDate }, options) {
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
      creationDate = parseISO(creationDate);
      creationDate.setHours(-3);
      where.creationDate = {
        [Op.eq]: creationDate,
      };
    }
    return await Movie.findAll({
      where,
      attributes: ["title", "image", "creationDate"],
    });
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }

  async findByTitle(title) {
    return await Movie.findOne({ where: { title } });
  }

  async save(m) {
    return await Movie.create(m, {
      include: [GenderType],
    });
  }

  async update(id, m) {
    return await Movie.update(m, {
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

module.exports = MovieRepository;
