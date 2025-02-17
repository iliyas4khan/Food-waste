const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Donation routes
router.post("/donate", donationController.createDonation);
router.get("/my-donations/:userId", donationController.getUserDonations);
router.get("/all-donations", donationController.getAllDonations);

module.exports = router;
