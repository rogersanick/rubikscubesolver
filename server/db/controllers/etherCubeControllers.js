const etherCubeModels = require('../models/etherCubeModels.js');

const etherCubeController = {
  get: (req, res) => {
    etherCubeModels.get(req.query.userId, (data) => {
      res.status(200).send(data)
    });
  },
  post: (req, res) => {
    etherCubeModels.post(req.body, (data) => {
      res.status(200).send(data);
    });
  },
  delete: (req,res) => {
    etherCubeModels.delete(req.query.id, (data) => {
      res.status(200).send(data);
    });
  }
}

module.exports = etherCubeController;