const { ThoughtModel } = require('../models');
const apiResponse = require('../helpers/api.helper');

/* CREATE REACTION */
exports.reactionStore = ({ body, params }, res) => {
  ThoughtModel.findByIdAndUpdate(
    { _id: params.thoughtId },
    { $push: { reactions: body } },
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
exports.reactionDelete = ({ params }, res) => {
  ThoughtModel.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { _id: params.reactionId } } },
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
