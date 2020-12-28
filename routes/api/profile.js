const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const ErrorResponse = require('./utils/errorResponse');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return next(new ErrorResponse('There is no profile for this user', 400));
    }

    res.json(profile);
  } catch (err) {
    return next(new ErrorResponse('Cannot access profile', 500));
  }
});

// @route     POST api/profile
// @desc      Create or update a user profile
// @access    Private
router.post('/', [auth], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // pulling all the fields out
  const {
    company,
    website,
    bio,
    status,
    githubusername,
    twitterusername,
    currentchallenge,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (twitterusername) profileFields.twitterusername = twitterusername;
  if (currentchallenge) profileFields.currentchallenge = currentchallenge;

  try {
    // since we are using async-await, whenever we are using a mongoose method we need to add await because it returns a promise
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create, if profile does not exists
    profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile);
  } catch (err) {
    return next(new ErrorResponse('Cannot access profile', 500));
  }
});

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user id
// @access    Public

router.get('/user/:user_id', async (req, res, next) => {
  try {
    // accessing the user ID from the url, thus using req.params.user_id
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return next(new ErrorResponse('There is no profile for that user', 400));
    res.json(profile);
  } catch (err) {
    return next(new ErrorResponse('Cannot access profile', 500));
  }
});

// @route     DELETE api/profile
// @desc      Delete profile & user
// @access    Private

// adding auth as it is private route and have to have access to req.user.id
router.delete('/', auth, async (req, res, next) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    return next(new ErrorResponse('Cannot delete profile', 500));
  }
});

// @route     PUT api/profile/challenges
// @desc      Add completed challenges to profile
// @access    Private
router.put(
  '/challenges',
  auth,

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, thingmostproudof, from, to, current } = req.body;

    const newChallenge = {
      title,
      thingmostproudof,
      from,
      to,
      current,
    };

    try {
      // fetching the profile
      const profile = await Profile.findOne({ user: req.user.id });

      profile.challenges.unshift(newChallenge);

      await profile.save();
      res.json(profile);
    } catch (err) {
      return next(new ErrorResponse('Cannot add challenge', 500));
    }
  }
);

// @route     DELETE api/profile/challenges/:chall_id
// @desc      Delete completed challenge from profile
// @access    Private
router.delete('/challenges/:chall_id', auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.challenges
      .map((item) => item.id)
      .indexOf(req.params.chall_id);

    // remove the actual experience
    profile.challenges.splice(removeIndex, 1);

    await profile.save();

    res.json({ profile });
  } catch (err) {
    return next(new ErrorResponse('Cannot delete challenge', 500));
  }
});

// @route     PUT api/profile/open-challenges
// @desc      Add an open challenge to profile
// @access    Private
router.put(
  '/open-challenges',
  auth,

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, numberofdaystotal, currentday, from } = req.body;

    const newOpenChallenge = {
      category,
      numberofdaystotal,
      currentday,
      from,
    };

    try {
      // fetching the profile
      const profile = await Profile.findOne({ user: req.user.id });

      profile.openchallenges.unshift(newOpenChallenge);

      await profile.save();
      res.json(profile);
    } catch (err) {
      return next(new ErrorResponse('Cannot add open challenge', 500));
    }
  }
);

// @route     UPDATE api/profile/open-challenges/:chall_id
// @desc      Update current day on an open challenge in profile
// @access    Private
router.put(
  '/open-challenges/:chall_id',
  auth,

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentday } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            'openchallenges.2.currentday': currentday,
          },
        },
        { new: true }
      );

      await profile.save();
      return res.json(profile);
    } catch (err) {
      return next(new ErrorResponse('Cannot update challenge', 500));
    }
  }
);

// @route     DELETE api/profile/open-challenges/:chall_id
// @desc      Delete open challenge from profile
// @access    Private
router.delete('/open-challenges/:chall_id', auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.openchallenges
      .map((item) => item.id)
      .indexOf(req.params.chall_id);

    // remove the actual experience
    profile.openchallenges.splice(removeIndex, 1);

    await profile.save();

    res.json({ profile });
  } catch (err) {
    return next(new ErrorResponse('Cannot delete open challenge', 500));
  }
});

module.exports = router;
