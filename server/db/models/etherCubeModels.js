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
  
  post: ({userId, title, pass, solution, cubeState, userMessage}, cb) => {
    let queryString = `insert into cubes (userid, title, pass, solution, cube_state, user_message) values (?, ?, ?, ?, ?, ?)`
    let paramsArray = [userId, title, pass, solution, cubeState, userMessage];
    console.log(paramsArray);
    db.query(queryString, paramsArray, (err, results) => {
      if (err) {
        console.log(err);
      }
      cb(results);
    });
  },

  delete: (id, cb) => {
    console.log(id);
    let queryString = `delete from cubes where id = ?`;
    let paramsArray = [id];
    db.query(queryString, paramsArray, (err, results) => {
      if (err) {
        console.log(err);
      }
      cb (results);
    })
  }
}

module.exports = modelsInterface;