const donationModel = require("../models/donationModel");

module.exports = {
  async createDonation(req, res) {
    const {
      donor_name,
      email,
      phone_number,
      collection_address,
      category,
      description,
      items,
      user_id,
    } = req.body;

    // Validate required fields
    if (
      !donor_name ||
      !email ||
      !phone_number ||
      !collection_address ||
      !category ||
      !user_id
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    try {
      // Create donation and get the new donation record
      const [newDonation] = await donationModel.createDonation({
        donor_name,
        email,
        phone_number,
        collection_address,
        category,
        description,
        user_id,
      });

      // Insert donation items
      if (items && items.length > 0) {
        for (const item of items) {
          if (item.item_name && item.quantity) {
            await donationModel.createDonationItem(newDonation.id, item); // Accessing the correct id
          } else {
            return res.status(400).json({
              message: "Item name and quantity must be provided for each item",
            });
          }
        }
      }

      // Send success response
      res.status(201).json({
        message: "Donation submitted successfully",
        donation: newDonation,
      });
    } catch (error) {
      console.error("Error submitting donation: ", error);
      res
        .status(500)
        .json({ message: "Error submitting donation", error: error.message });
    }
  },

  async getUserDonations(req, res) {
    const { userId } = req.params;

    try {
      const donations = await donationModel.getDonationsByUser(userId);

      if (!donations.length) {
        return res
          .status(404)
          .json({ message: "No donations found for this user." });
      }

      res
        .status(200)
        .json({ message: "Donations fetched successfully", donations });
    } catch (error) {
      res.status(500).json({ message: "Error fetching donations", error });
    }
  },

  async getAllDonations(req, res) {
    try {
      const donations = await donationModel.getDonations();

      if (!donations.length) {
        return res.status(404).json({ message: "No donations found." });
      }

      res
        .status(200)
        .json({ message: "Donations fetched successfully", donations });
    } catch (error) {
      res.status(500).json({ message: "Error fetching donations", error });
    }
  },
};
