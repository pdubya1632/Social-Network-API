const { model, Schema } = require('mongoose');

const thoughtSchema = new Schema(
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
        type: new Schema(
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);
