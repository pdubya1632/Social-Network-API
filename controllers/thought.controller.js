const { ThoughtModel, UserModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE THOUGHT */
exports.thoughtStore = ({ body }, res) => {
  ThoughtModel.create(body)
    .then(({ username, _id }) => {
      return UserModel.findOneAndUpdate(
        { username: username },
        { $addToSet: { thoughts: _id } },
        { new: true, runValidators: true }
      );
    })
    .then((thoughtData) => {
      if (!thoughtData) {
        apiResponse.notFoundResponse(
          res,
          'User not found with that username'
        );
      }
      apiResponse.successResponseWithData(
        res,
        'Thought creation success',
        thoughtData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* GET ALL THOUGHTS */
exports.thoughtList = (req, res) => {
  ThoughtModel.find({}, (err, thoughts) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
    }
    apiResponse.successResponseWithData(
      res,
      'Listing all thoughts...',
      thoughts
    );
  });
};

/* GET SINGLE THOUGHT */
exports.thoughtDetail = ({ params }, res) => {
  ThoughtModel.findOne({ _id: params.id }, (err, result) => {
    if (err) {
      return apiResponse.errorResponse(res, err);
    }
    apiResponse.successResponseWithData(
      res,
      'Listing thought by id',
      result
    );
  });
};

/* UPDATE SINGLE THOUGHT */
exports.thoughtUpdate = ({ params, body }, res) => {
  ThoughtModel.findByIdAndUpdate(
    { _id: params.id },
    { thoughtText: body.thoughtText },
    { new: true, runValidators: true }
  )
    .then((thoughtData) => {
      if (!thoughtData) {
        apiResponse.notFoundResponse(
          res,
          'Thought not found with id provided'
        );
      }
      apiResponse.successResponseWithData(
        res,
        'Update success',
        thoughtData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* DELETE SINGLE THOUGHT */
exports.thoughtDelete = ({ params }, res) => {
  ThoughtModel.findByIdAndRemove(params.id)
    .exec()
    .then((thoughtData) => {
      if (!thoughtData) {
        apiResponse.notFoundResponse(
          res,
          'Thought not found with id provided'
        );
      }
      apiResponse.successResponseWithData(
        res,
        'Delete success',
        thoughtData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};
