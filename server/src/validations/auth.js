const { body } = require("express-validator");

const loginValidation = [
  body("email", "Email wrong").isEmail(),
  body("password", "Password wrong").isLength({ min: 5 }),
];

const registerValidation = [
  body("email", "Email wrong").isEmail(),
  body("password", "Password wrong").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarURL").optional().isURL(),
];

const postCreateValidation = [
  body("title", "Need to add title").isLength({ min: 3 }).isString(),
  body("text", "Password wrong").isLength({ min: 3 }).isString(),
  body("tags").isLength({ min: 3 }).optional().isString(),
  body("imageURL").optional().isString(),
];

const commentCreateValidation = [
  body("text", "Need to add a text").isLength({ min: 3 }).isString()
]

module.exports = {
  loginValidation,
  registerValidation,
  postCreateValidation,
  commentCreateValidation,
};
