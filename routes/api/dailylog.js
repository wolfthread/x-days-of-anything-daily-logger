const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const DailyLog = require('../../models/DailyLog');
const User = require('../../models/User');

// @route     POST api/dailylog
// @desc      Add a daily log
// @access    Private
router.post('/', auth, async (req, res) => {
  const {
    user,
    date,
    day,
    category,
    timer,
    thoughts,
    accomplishments,
    links,
  } = req.body;

  try {
    const newDailyLog = new DailyLog({
      user,
      date,
      day,
      category,
      timer,
      thoughts,
      accomplishments,
      links,
      user: req.user.id,
    });

    const dailylog = await newDailyLog.save();

    res.json(dailylog);
  } catch (err) {
    return next(new ErrorResponse('Cannot add log', 500));
  }
});

// @route     GET api/dailylog
// @desc      Get all dailylogs for current user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const dailylogs = await DailyLog.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(dailylogs);
  } catch (err) {
    return next(new ErrorResponse('No logs found', 500));
  }
});

// @route   PUT api/dailylog/:id
// @desc    Updating a dailylog
// @acess   Private
router.put('/:id', auth, async (req, res) => {
  const {
    user,
    date,
    day,
    category,
    timer,
    thoughts,
    accomplishments,
    links,
  } = req.body;

  // Build dailylog object
  const dailylogFields = {};

  if (user) dailylogFields.user = user;
  if (date) dailylogFields.date = date;
  if (day) dailylogFields.day = day;
  if (category) dailylogFields.category = category;
  if (timer) dailylogFields.timer = timer;
  if (thoughts) dailylogFields.thoughts = thoughts;
  if (accomplishments) dailylogFields.accomplishments = accomplishments;
  if (links) dailylogFields.links = links;

  try {
    let dailylog = await DailyLog.findById(req.params.id);

    if (!dailylog) return next(new ErrorResponse('Daily log not found', 401));

    // Make sure user owns dailylog
    if (dailylog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized!' });
    }

    // find by dailylog id and update
    dailylog = await DailyLog.findByIdAndUpdate(
      req.params.id,
      { $set: dailylogFields },
      // if dailylog does not exist, create it
      { new: true }
    );

    res.json(dailylog);
  } catch (err) {
    return next(new ErrorResponse('Cannot update log', 500));
    // console.error(err.message);
    // res.status(500).send('Server Error');
  }
});

// @route     DELETE api/dailylog/:id
// @desc      Delete a daily log
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let dailylog = await DailyLog.findById(req.params.id);

    // if (!dailylog) return res.status(404).json({ msg: 'Daily Log Not Found' });
    if (!dailylog) return next(new ErrorResponse('Daily Log Not Found', 401));

    // Make sure user owns dailylog
    if (dailylog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized!' });
    }

    await DailyLog.findByIdAndRemove(req.params.id);

    res.json('Daily Log Deleted!');
  } catch (err) {
    return next(new ErrorResponse('Cannot delete log', 500));
    // console.error(err.message);
    // res.status(500).send('Server Error');
  }
});

module.exports = router;
