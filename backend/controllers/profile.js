const router = require('express').Router()
const User = require('../mongo').User

router.get('/init', async(req, res) => {
  const user = await User.findOne({ email: req.profileObj.email })
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
  });
})

module.exports = router
