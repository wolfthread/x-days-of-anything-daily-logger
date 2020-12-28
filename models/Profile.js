const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  twitterusername: {
    type: String,
  },
  currentchallenge: {
    type: String,
  },
  openchallenges: [
    {
      category: {
        type: String,
      },
      numberofdaystotal: {
        type: Number,
      },
      currentday: {
        type: Number,
      },
      from: {
        type: Date,
      },
    },
  ],
  challenges: [
    {
      title: {
        type: String,
      },
      thingmostproudof: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],
  dailylogs: [
    {
      timer: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      day: {
        type: Number,
      },
      category: {
        type: String,
      },
      thoughts: {
        type: String,
      },
      accomplishments: [
        {
          accomplishment: {
            type: String,
          },
        },
      ],
      links: [
        {
          link: {
            type: String,
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
