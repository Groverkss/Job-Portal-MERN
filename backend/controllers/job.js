const router = require('express').Router()
const { Job, User } = require('../mongo')
const logger = require('../utils/logger')

router.get('/all', async (req, res) => {
  let jobs = await Job.find({});

  jobs = jobs.map( job => {
    const { __v, ...rest } = job._doc;
    return rest;
  } );

  res.json(jobs);
});

router.post('/add', async(req, res) => {
  const job = req.body; 
  logger.info("Job Recieved");
  logger.info(job);

  const recruiter = await User.findOne({ email: req.profileObj.email });

  const newJob = new Job({
    title: job.title,
    name: recruiter.firstName + ' ' + recruiter.lastName,
    email: req.profileObj.email,
    applications: job.applications,
    positions: job.positions,
    type: job.type,
    salary: job.salary,
    duration: job.duration,
    skills: job.skills,
    deadline: job.deadline,
    rating: {
      ratingSum: 0,
      ratingTotal: 0,
    },
    applied: [],
  });

  await newJob.save();
  res.json({
    status: 1,
    content: "Added Job successfully"
  })
});

module.exports = router
