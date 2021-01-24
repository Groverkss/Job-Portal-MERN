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

router.post('/apply', async (req, res) => {
  const applicant = await User.findOne({ email: req.profileObj.email });
  const job = await Job.findOne({ _id: req.body.jobId });

  job.applied = job.applied.concat( {
    applicant: applicant._id,
    sop: req.body.sop,
  });
  await job.save();

  applicant.applied = applicant.applied.concat({ 
    job: job._id,
    status: "Applied"
  });
  await applicant.save();

  res.sendStatus(200);
});

router.get('/getMy', async (req, res) => {
  const user = await User
    .findOne({ email: req.profileObj.email })
    .populate('applied.job');

  const { passwordHash, __v, ...rest } = user._doc;

  res.json(rest);
});

router.get('/getRecJobs', async (req, res) => {
  const jobs = await Job
    .find({ email: req.profileObj.email })
    .populate('applied.applicant');

  res.json(jobs);
});

router.post('/getJob', async (req, res) => {
  const job = await Job
    .findOne({ _id: req.body.jobId })
    .populate('applied.applicant');

  res.json(job);
})

module.exports = router;
