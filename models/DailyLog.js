const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyLogSchema = new Schema({
  // a dailylog is connected to a user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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
  timer: {
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
});

module.exports = mongoose.model('dailylog', DailyLogSchema);
