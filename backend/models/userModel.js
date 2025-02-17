const sql = require("../config/db");

// Create Users table if not exists
async function createUserTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      phone_number VARCHAR(15) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

createUserTable();

module.exports = {
  async createUser(user) {
    return await sql`
      INSERT INTO users (name, username, phone_number, email, password)
      VALUES (${user.name}, ${user.username}, ${user.phone_number}, ${user.email}, ${user.password})
      RETURNING *
    `;
  },

  async findUserByEmail(email) {
    return await sql`SELECT * FROM users WHERE email = ${email}`;
  },

  async findUserByUsername(username) {
    return await sql`SELECT * FROM users WHERE username = ${username}`;
  },
};
