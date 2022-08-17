const { body, validationResult } = require('express-validator');
const ThoughtModel = require('../models/thought.model');
const apiResponse = require('../helpers/api.helper');

/* CREATE REACTION */
exports.reactionStore = [
  body('reactionBody')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Reaction must be specified.'),
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
        // const reaction = new ThoughtModel({
        //   reactionBody: req.body.reactionBody,
        // });
        const reaction = ThoughtModel.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: req.body.reactionBody } },
          { new: true, runValidators: true }
        );
        reaction.save(function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          let reactionData = {
            reactionBody: req.body.reactionBody,
          };
          return apiResponse.successResponseWithData(
            res,
            'New Reaction Created',
            reactionData
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/* DELETE SINGLE REACTION */
exports.reactionDelete = async (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
  );
  res.send('Reaction deleted');
};
