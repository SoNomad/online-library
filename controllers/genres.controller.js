const Genre = require("../models/Genre.model");

module.exports.genresController = {
  addGenre: async (req, res) => {
    try {
      const genre = await Genre.create({
        name: req.body.name,
      });
      res.json(genre);
    } catch (e) {
      res.json(e.message);
    }
  },

  getGenre: async (req, res) => {
    try {
      const genre = await Genre.find();
      res.json(genre);
    } catch (e) {
      res.json(e);
    }
  },

  editGenre: async (req, res) => {
    try {
      await Genre.findByIdAndUpdate(req.params.id, req.body);
      res.json("Изменения сохранены");
    } catch (e) {
      res.json(
        "Возникла ошибка при редактировании жанра. Код ошибки:/n" + e.message
      );
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndRemove(req.params.id);
      res.json("Genre has been removed");
    } catch (e) {
      res.json("Возникла ошибка при удалении genre. Код ошибки:/n" + e);
    }
  },
};
