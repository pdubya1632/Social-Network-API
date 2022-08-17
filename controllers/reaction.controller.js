const { ThoughtModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE REACTION */
exports.reactionStore = (req, res) => {
  ThoughtModel.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.body } },
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
        'Creation success',
        thoughtData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* DELETE SINGLE REACTION */
exports.reactionDelete = (req, res) => {
  ThoughtModel.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { _id: req.params.reactionId } } },
    { new: true }
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
        'Deletion success',
        thoughtData
      );
    })
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};
