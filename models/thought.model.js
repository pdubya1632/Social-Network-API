const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      required: true,
      type: String,
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    reactions: [
      {
        type: new mongoose.Schema(
          {
            reactionBody: {
              type: String,
              required: true,
            },
            username: {
              type: String,
              required: true,
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
