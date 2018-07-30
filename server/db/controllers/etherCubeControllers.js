const etherCubeModels = require('../models/etherCubeModels.js');

const etherCubeController = {
  get: (req, res) => {
    etherCubeModels.get(req.query.userId, (data) => {
      res.status(200).send(data)
    });
  },
  post: (req, res) => {
    etherCubeModels.post(req.body.userId, req.body.solution, req.body.cubeState, req.body.etherContractId, (data) => {
      res.status(200).send(data);
    })
  }
}

module.exports = etherCubeController;