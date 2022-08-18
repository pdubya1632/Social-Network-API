const { model, Schema } = require('mongoose');
// const thoughtSchema = require('./thought.model');

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [this],
  },
  { timestamps: true }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = model('User', userSchema);
