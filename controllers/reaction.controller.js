const { ThoughtModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE REACTION */
exports.reactionStore = ({ body, params }, res) => {
  ThoughtModel.findByIdAndUpdate(
    { _id: params.thoughtId },
    { $addToSet: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then((thoughtData) =>
      !thoughtData
        ? apiResponse.notFoundResponse(
            res,
            'Thought not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'Reaction creation success',
            thoughtData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};

/* DELETE SINGLE REACTION */
exports.reactionDelete = ({ params }, res) => {
  ThoughtModel.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { _id: params.reactionId } } },
    { new: true }
  )
    .then((thoughtData) =>
      !thoughtData
        ? apiResponse.notFoundResponse(
            res,
            'Thought not found with id provided'
          )
        : apiResponse.successResponseWithData(
            res,
            'Reaction deletion success',
            thoughtData
          )
    )
    .catch((err) => {
      return apiResponse.errorResponse(res, err);
    });
};
