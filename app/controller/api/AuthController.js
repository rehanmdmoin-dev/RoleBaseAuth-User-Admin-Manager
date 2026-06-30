const User = require("../../models/User");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }

      const salt = await brctpyjs.genSalt(10);
      const hashPassword = await brctpyjs.hash(password, salt);

      const userdata = new User({
        name,
        email,
        phone,
        password: hashPassword,
      });

      const data = await userdata.save();
      return res.status(200).json({
        status: true,
        message: "User registered successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: error,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
      });
    }
    //console.log(userExist);

    const isMatch = await brctpyjs.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = await jwt.sign({ 
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone,
        role: userExist.role, 
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user:{
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone,
        role: userExist.role,
      },
      token: token,
    });
  }


  async dashboard(req, res) {

      return res.status(200).json({
        status: true,
        message: "Dashboard",
        user: req.user,
      });

  }

  async updateProfile(req, res) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      const userExist = await User.findById(req.user.id);
      if (!userExist) {
        return res.status(400).json({
          status: false,
          message: "User does not exist",
        });
      }

      userExist.name = name;
      userExist.email = email;
      userExist.phone = phone;
      userExist.password = userExist.password;
      //hash password
      const salt = await brctpyjs.genSalt(10);
      const hashPassword = await brctpyjs.hash(userExist.password, salt);
      userExist.password = hashPassword;  
      const data = await userExist.save();
      return res.status(200).json({
        status: true,
        message: "Profile updated successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: error,
      });
    }
  }
}

module.exports = new AuthController();