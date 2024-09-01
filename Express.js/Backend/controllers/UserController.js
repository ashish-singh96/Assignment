import user from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class UserController {
  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
      }
      const emailExists = await user.findOne({ email });
      if (emailExists) {
        return res.status(409).json({ message: "User already exists!" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new user({ name, email, password: hashPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExits = await user.findOne({ email });
      if (!userExits)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, userExits.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });


      const payload = { userExits: { id: userExits.id } };
      const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: '1h' });

      res.status(200).json({ message: "Login Successfully!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };
  
}

export default UserController;
