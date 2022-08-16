const mongoose = require('mongoose');
const thoughtSchema = require('./thought.model');

const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    thoughts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' },
    ],
    friends: [this],
  },
  { timestamps: true }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = mongoose.model('User', userSchema);
