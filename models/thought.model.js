const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      required: true,
      type: String,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [
      {
        type: new mongoose.Schema(
          {
            reactionId: Number,
            reactionBody: String,
            username: String,
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