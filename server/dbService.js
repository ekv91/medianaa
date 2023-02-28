//INSTALNIRANJE PAKETOV
const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// POVEZAVA MYSQL D DOTENV

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM stevilke;';

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Dodaj v databazo
  async insertNewMediana(mediana) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query =
          'INSERT INTO stevilke (mediana, date_added) VALUES (?,?);';

        connection.query(query, [mediana, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        mediana: mediana,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // BRISANJE PO ID-ju
  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = 'DELETE FROM stevilke WHERE id = ?';

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
module.exports = DbService;
