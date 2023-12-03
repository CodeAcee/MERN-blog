const bcrypt = require("bcrypt");
const UserSchema = require("../models/User.schema");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, email, password, avatarURL } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      fullName,
      email,
      passwordHash,
      avatarURL,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can`t register",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Wrong email or password",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Wrong email or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can`t register",
    });
  }
};

const isAuth = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId, { passwordHash: 0 });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
  isAuth,
};
