const pool = require('../../db/pool');
const toCamelCase = require('./utils/to-camel-case');
const { query } = require('../../db/pool');

class UserRepo {
  //Static method to retrive all the users
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');

    return toCamelCase(rows);
  }
  //Static method to find the user with a given id
  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [
      id,
    ]);

    return toCamelCase(rows)[0];
  }
  //Static method to insert a new user
  static async insert(username, bio) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;',
      [username, bio]
    );

    return toCamelCase(rows)[0];
  }
  //Static method to update the user info 
  static async update(id, username, bio) {
    const {
      rows,
    } = await pool.query(
      'UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;',
      [username, bio, id]
    );

    return toCamelCase(rows)[0];
  }
  //Static method to delete a user
  static async delete(id) {
    const {rows} = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
    return toCamelCase(rows)[0];
  }
  //Static method to retrieve the number of users in the db
  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM users;');

    return parseInt(rows[0].count);
  }
}

module.exports = UserRepo;
