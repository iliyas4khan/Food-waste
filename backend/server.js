const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const donationController = require("./controllers/donationController");

dotenv.config();
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
  //   res.send("Hello World");
});

//Import Routes
const userRoutes = require("./routes/userRoutes");
const donationRoutes = require("./routes/donationRoutes");

//Use Routes
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);

//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

//Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
