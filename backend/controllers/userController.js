const userModel = require("../models/userModel");

module.exports = {
  async registerUser(req, res) {
    const { name, username, phone_number, email, password } = req.body;

    try {
      const userExists = await userModel.findUserByEmail(email);

      if (userExists.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = await userModel.createUser({
        name,
        username,
        phone_number,
        email,
        password,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const users = await userModel.findUserByEmail(email);
      const user = users[0];

      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // If successful, return user info
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      // Log error and return 500 status
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in", error });
    }
  },
};
