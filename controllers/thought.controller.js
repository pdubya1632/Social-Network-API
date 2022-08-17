const { body, validationResult } = require('express-validator');
const ThoughtModel = require('../models/user.model');
const apiResponse = require('../helpers/api.helper');

/* CREATE THOUGHT */
exports.thoughtStore = [
  body('thoughtText')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Thought text must be specified.'),
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
        const user = new ThoughtModel({
          thoughtText: req.body.thoughText,
          username: req.body.thoughtname,
          userId: req.body.id,
        });
        user.save(function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          let userData = {
            username: user.thoughtname,
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

/* GET ALL THOUGHTS */
exports.thoughtList = async (req, res) => {
  ThoughtModel.find({}, (err, result) => {
    if (err) {
      return apiResponse.ErrorResponse(res, err);
    }
    res.send(result);
  });
};

/* GET SINGLE THOUGHT */
exports.thoughtDetail = async (req, res) => {
  ThoughtModel.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return apiResponse.ErrorResponse(res, err);
    }
    res.send(result);
  });
};

/* UPDATE SINGLE THOUGHT */
exports.thoughtUpdate = async (req, res) => {
  const updatedUser = await ThoughtModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    return apiResponse.successResponseWithData(
      res,
      'Operation success',
      updatedUser
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

/* DELETE SINGLE THOUGHT */
exports.thoughtDelete = async (req, res) => {
  ThoughtModel.findByIdAndRemove(req.params.id).exec();
  res.send('Deleted');
};

//   function (req, res) {
//     try {
//       ThoughtModel.find({}).then((users) => {
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
