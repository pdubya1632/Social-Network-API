const { UserModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE USER */
exports.userStore = ({ body }, res) => {
  UserModel.create(body)
    .then((userData) => {
      apiResponse.successResponseWithData(
        res,
        'User creation success',
        userData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* GET ALL USERS */
exports.userList = async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
    }
    apiResponse.successResponseWithData(
      res,
      'Listing all users...',
      result
    );
  });
};

/* GET SINGLE USER */
exports.userDetail = async (req, res) => {
  UserModel.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
    }
    apiResponse.successResponseWithData(
      res,
      'Listing single user...',
      result
    );
  });
};

/* UPDATE SINGLE USER */
exports.userUpdate = ({ body, params }, res) => {
  UserModel.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  })
    .then((userData) =>
      !userData
        ? apiResponse.notFoundResponse(
            res,
            'User not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'User update success',
            userData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* DELETE SINGLE USER */
exports.userDelete = async (req, res) => {
  UserModel.findByIdAndRemove(req.params.id)
    .exec()
    .then((userData) =>
      !userData
        ? apiResponse.notFoundResponse(
            res,
            'User not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'User delete success',
            userData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* CREATE FRIEND CONNECTION */
exports.friendStore = ({ params }, res) => {
  UserModel.findByIdAndUpdate(
    { _id: params.userId },
    { $addToSet: { friends: params.friendId } },
    { runValidators: true, new: true }
  )
    .then((userData) =>
      !userData
        ? apiResponse.notFoundResponse(
            res,
            'User not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'Friend connection created',
            userData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* DELETE FRIEND CONNECTION */
exports.friendDelete = (req, res) => {
  UserModel.findByIdAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((userData) =>
      !userData
        ? apiResponse.notFoundResponse(
            res,
            'User not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'User delete success',
            userData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};
