const sql = require("../config/db");

// Create donations and donation_items tables if they don't exist
async function createDonationTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS donations (
      id SERIAL PRIMARY KEY,
      donor_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone_number VARCHAR(15) NOT NULL,
      collection_address TEXT NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS donation_items (
      id SERIAL PRIMARY KEY,
      donation_id INTEGER REFERENCES donations(id) ON DELETE CASCADE,
      item_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL
    )
  `;
}

createDonationTables();

module.exports = {
  async createDonation(donation) {
    console.log("Creating donation in the database: ", donation);

    try {
      return await sql`
        INSERT INTO donations (donor_name, email, phone_number, collection_address, category, description, user_id)
        VALUES (${donation.donor_name}, ${donation.email}, ${donation.phone_number}, ${donation.collection_address}, ${donation.category}, ${donation.description}, ${donation.user_id})
        RETURNING *
      `;
    } catch (error) {
      console.error("Error during database insertion: ", error);
      throw error; // Throw error to be caught in the controller
    }
  },

  async createDonationItem(donation_id, item) {
    console.log(`Creating item for Donation ID ${donation_id}: `, item);

    try {
      return await sql`
        INSERT INTO donation_items (donation_id, item_name, quantity)
        VALUES (${donation_id}, ${item.item_name}, ${item.quantity})
      `;
    } catch (error) {
      console.error("Error during donation item insertion: ", error);
      throw error; // Throw error to be caught in the controller
    }
  },

  async getDonationsByUser(user_id) {
    return await sql`
      SELECT * FROM donations WHERE user_id = ${user_id}
    `;
  },

  async getDonations() {
    return await sql`
      SELECT 
        d.id as donation_id, 
        d.donor_name, 
        d.email, 
        d.phone_number, 
        d.collection_address, 
        d.category, 
        d.description, 
        d.user_id, 
        d.created_at,
        -- Group items into a JSON array
        json_agg(json_build_object('item_name', di.item_name, 'quantity', di.quantity)) as items
      FROM donations d
      LEFT JOIN donation_items di 
        ON d.id = di.donation_id
      GROUP BY d.id
    `;
  },
};
