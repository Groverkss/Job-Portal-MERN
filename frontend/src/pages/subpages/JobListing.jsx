import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { JobCard } from '../components/JobCard'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Slider from '@material-ui/core/Slider'
import FuzzySearch from 'fuzzy-search'

import JobService from '../../services/jobs'
import UserService from '../../services/users'

import { SopDialogForm } from '../components/JobDialogs'

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
        Recruiter : { job.name } 
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

  const [ user, setUser ] = useState("");

  const genAction = (job) => {
    const check = job.applied.find( app => app.applicant === user._id );

    if (!check) {
      return (
        <SopDialogForm 
          jobId={job._id} 
          setData={setData}
        />
      )
    } else {
      return (
        <Button
          disabled
        >
          Applied
        </Button>
      )
    }
  };

  const [ jobs, setJobs ] = useState([]);

  const setData = async () => {
    const jobRes = await JobService.getAll();
    const userRes = await UserService.initDashboard();
    setJobs(jobRes);
    setUser(userRes);
  };

  useEffect( () => {
    setData();
  }, []);

  const [ filters, setFilters ] = useState({
    search: "",
    sortBase: "salary",
    order: 1,
    type: "none",
    duration: -1,
  });

  const handleChange = event => {
    if (event.target.value !== undefined) {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    } else {
      setFilters({
        ...filters,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  }

  let filtered = jobs;

  const fizz = new FuzzySearch(jobs, ['title']);

  filtered = fizz.search(filters.search);

  filtered = filtered.sort( (a, b) => {
    if (filters.sortBase === "salary") {
      return filters.order * (a.salary - b.salary);
    } else if (filters.sortBase === "duration") {
      let newA = a.duration, newB = b.duration;
      if (newA === 0) {
        newA = 7;
      }

      if (newB === 0) {
        newB = 7;
      }

      return filters.order * (newA - newB);
    } else {
      return a.salary - b.salary;
    }
  })

  filtered = filtered.filter( val => {
    if (filters.type === "none") {
      return true;
    } else {
      return val.type === filters.type;
    }
  } )

  filtered = filtered.filter( val => {
    if (filters.duration === -1) {
      return true;
    } else {
      return val.duration === filters.duration;
    }
  } )

  return (
    <>
      <Container>
        <div className={classes.root}>
          <Paper elevation={3}>
            <div className={classes.paperContent}>
              <Grid container spacing={1}>
                <Grid item xs={4} className={classes.contentLeft}>
                  <TextField 
                    className={classes.searchBar}
                    label="Search"
                    helperText="Search for jobs"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4} className={classes.searchButton}>
                  <InputLabel>
                    <Typography variant="caption">Sort Based On</Typography>
                  </InputLabel>
                  <ButtonGroup>
                    <Button 
                      variant="contained" 
                      color="primary"
                      name="sortBase"
                      value="salary"
                      onClick={handleChange}
                    >
                      Salary
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      name="sortBase"
                      value="duration"
                      onClick={handleChange}
                    >
                      Duration
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      name="sortBase"
                      value="rating"
                      onClick={handleChange}
                    >
                      Rating
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={3} className={classes.searchButton}>
                  <InputLabel>
                    <Typography variant="caption">Sorting Order</Typography>
                  </InputLabel>
                  <ButtonGroup>
                    <Button 
                      variant="contained" 
                      color="primary"
                      name="order"
                      value={1}
                      onClick={handleChange}
                    >
                      Ascending
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      name="order"
                      value={-1}
                      onClick={handleChange}
                    >
                      Descending
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <br />
              <div className={classes.paperContent}>
                <Grid container spacing={1}>
                  <Grid item xs={3} className={classes.contentLeft}>
                    <FormControl className={classes.textBar}>
                      <InputLabel>Job Type</InputLabel>
                      <Select 
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Full-Time">Full Time</MenuItem>
                        <MenuItem value="Part-Time">Part Time</MenuItem>
                        <MenuItem value="Work-From-Home">Work From Home</MenuItem>
                      </Select>
                      <FormHelperText>Filter based on Job Type</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} className={classes.contentLeft}>
                    {/* Add value as an array [0, 100]*/}
                    <div className={classes.salary}>
                      <InputLabel>
                        <Typography variant="caption">Filter Salary</Typography>
                      </InputLabel>
                      <Slider
                        className={classes.slider}
                        valueLabelDisplay="auto"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3} className={classes.contentLeft}>
                    <FormControl className={classes.textBar}>
                      <InputLabel>Duration</InputLabel>
                      <Select 
                        name="duration"
                        value={filters.duration}
                        onChange={handleChange}
                      >
                        <MenuItem value={-1}>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Indefinate</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                      </Select>
                      <FormHelperText>Filter based on duration</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </div>

          </Paper>
        </div>
        <Grid container spacing={3}>
          {
            filtered.map( job => (
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
