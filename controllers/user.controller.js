const { body, validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const apiResponse = require('../helpers/api.helper');

/* CREATE USER */
exports.userStore = [
  body('username')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        return Promise.reject('Email already in use');
      }
    }),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        );
      } else {
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
        });
        user.save(function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          let userData = {
            username: user.username,
            email: user.email,
          };
          return apiResponse.successResponseWithData(
            res,
            'New User Created',
            userData
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/* GET ALL USERS */
exports.userList = async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

//   function (req, res) {
//     try {
//       UserModel.find({}).then((users) => {
//         if (users.length > 0) {
//           return apiResponse.successResponseWithData(
//             res,
//             'Operation success',
//             users
//           );
//         } else {
//           return apiResponse.successResponseWithData(
//             res,
//             'Operation success',
//             []
//           );
//         }
//       });
//     } catch (err) {
//       return apiResponse.ErrorResponse(res, err);
//     }
//   },
// ];
