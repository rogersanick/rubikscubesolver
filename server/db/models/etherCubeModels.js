var db = require('../index.js');

var modelsInterface = {
  get: (userId, cb) => {
    let queryString = 'select * from cubes where userid = ?'
    let paramsArray = [userId];
    db.query(queryString, paramsArray, (err, results) => {
      if (err) {
        console.log(err);
      }
      cb(results);
    });
  },
  post: (userId, pass, solution, cubeState, etherContractId, title, userMessage, cb) => {
    let queryString = `insert into cubes (userid, pass, solution, cube_state, ether_contract_id, title, user_message) values (?, ?, ?, ?, ?, ?, ?)`
    let paramsArray = [userId, pass, solution, cubeState, etherContractId, title, userMessage];
    db.query(queryString, paramsArray, (err, results) => {
      if (err) {
        console.log(err);
      }
      cb(results);
    });
  }
}

module.exports = modelsInterface;