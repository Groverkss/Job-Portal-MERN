import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import { JobCard } from '../components/JobCard'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'

import JobService from '../../services/jobs'

import { JobDashboard } from '../components/JobDashboard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: "100%",
    },
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
  },
  paperContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  contentLeft: {
    marginLeft: theme.spacing(4),
    display: "flex",
    justifyContent: "center"
  },
  contentMid: {
    display: "flex",
    justifyContent: "center"
  },
  searchButton: {
    // marginTop: theme.spacing(2),
  },
  searchBar: {
    width: "65%",
  },
  lowerContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  slider: {
    marginTop: theme.spacing(2),
  },
  salary: {
    width: 200,
  },
  textBar: {
    width: "70%",
  }
}));

const App = () => {

  const classes = useStyles();

  const genContent = (job) => (
    <>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        { job.title }
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        { job.type } • ${ job.salary } per month
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        { job.applications } Remaining Applications
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        { job.positions } Remaining Position
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        Duration : { job.duration ? `${job.duration} Months` : "Indefinate" }
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        Deadline : { Date( job.deadline ).toString() }
      </Typography>
      <br />
      <Typography
        className={classes.subtitle}
        component="div"
        color="textSecondary"
      >
        {
          job.skills.map( skill => {
            return (
              <div key={skill}>
              {skill}{" "}
              </div>
            );
          })
        }
      </Typography>
    </>
  );

  const genAction = job => (
    <>
      <JobDashboard jobId={job._id}/>
      <Button>
        Edit
      </Button>
      <Button>
        Delete
      </Button>
    </>
  );

  const [ jobs, setJobs ] = useState([]);

  useEffect( () => {
    const setData = async () => {
      const res = await JobService.getRecJobs();
      setJobs(res);
    };
    setData();
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {
            jobs.map( job => (
              <div key={job._id}>
                <Grid item>
                  <JobCard 
                    content={genContent(job)}
                    action={genAction(job)}
                  />
                </Grid>
              </div>
            ) )
          }
        </Grid>
      </Container>
    </>
  );
}

export default App;
