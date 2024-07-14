const User = require("../models/User");

const getAllUsersService = async (req, res) => {
  try {
    const users = await User.find({ role: "User" })
      .select("-password")
      .populate("borrowedBooks");
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createUserService = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      email,
      password,
    });

    await user.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// const getCurrentUserService = async (req, res) => {
//   try {
//     console.log("Request user:", req.user);
//     const user = req.user;

//     if (!user) {
//       console.log("User not authenticated");
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     console.log("Fetching user with ID:", user._id);
//     const currentUser = await User.findById(user._id).select("-password");

//     console.log("Fetched current user:", currentUser);

//     if (!currentUser) {
//       console.log("User not found in database");
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(currentUser);
//   } catch (error) {
//     console.error("Error in getCurrentUserService:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  getAllUsersService,
  createUserService,
  // getCurrentUserService,
};
