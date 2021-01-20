const router = require('express').Router()
const { User, Applicant, Recruiter } = require('../mongo')

router.get('/init', async(req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
  });
});

router.get('/details', async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  let details = {};

  if (user.type === 0) {
    details = await Applicant.findOne({ email: req.profileObj.email });
  } else {
    details = await Recruiter.findOne({ email: req.profileObj.email });
  }

  const { passwordHash, _id, __v, ...rest} = {
    ...user._doc,
    ...details._doc,
  };

  res.json({
    ...rest,
  });
});

module.exports = router
