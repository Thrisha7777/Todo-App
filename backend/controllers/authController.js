import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const loginUser = async (req, res) => {
  const { email, name, provider } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, provider });
      await user.save();
    }

    const token = generateToken(user);

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
