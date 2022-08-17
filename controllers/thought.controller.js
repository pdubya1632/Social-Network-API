const { body, validationResult } = require('express-validator');
const { ThoughtModel, UserModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE THOUGHT */
exports.thoughtStore = ({ body }, res) => {
  ThoughtModel.create(body)
    .then(({ username, _id }) => {
      return UserModel.findOneAndUpdate(
        { username: username },
        { $push: { thoughts: _id } },
        { new: true, runValidators: true }
      );
    })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: 'No user found at this id!' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

/* GET ALL THOUGHTS */
exports.thoughtList = async (req, res) => {
  ThoughtModel.find({}, (err, result) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
    }
    res.send(result);
  });
};

/* GET SINGLE THOUGHT */
exports.thoughtDetail = async (req, res) => {
  ThoughtModel.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
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
    return apiResponse.errorResponse(res, err);
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
//       return apiResponse.errorResponse(res, err);
//     }
//   },
// ];
