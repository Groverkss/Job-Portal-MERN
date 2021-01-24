import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup'

import JobService from '../../services/jobs'
import ProfileService from '../../services/profile'

import JobProfile from './JobProfile'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStyles2 = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowSkills = ({ email }) => {

  const [ skills, setSkills ] = useState([]);

  const setData = async () => {
    const res = await ProfileService.getApplicant(email);
    setSkills(res.skills);
  }

  useEffect( () => {
    setData();
  }, []);

  return (
    <>
      {
        skills?.reduce( ( accum, curr ) => accum.concat(`${curr}, `), "")
      }
    </>
  );
}

export const JobDashboard = ({ jobId }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [ open, setOpen ] = useState(false);
  const [ job, setJob ] = useState({});
  const [ filters, setFilters ] = useState({
    sort: "name",
    order: 1,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setData = async () => {
    const res = await JobService.getJob(jobId);
    setJob(res);
  }

  useEffect( () => {
    setData();
  }, []); 

  const handleClick = event => {
    setFilters({
      ...filters,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  job.applied?.sort( (a, b) => {
    if (filters.sort === "name") {
      if (
        a.applicant.firstName.toLowerCase() < b.applicant.firstName.toLowerCase()
      ) {
        return -1 * filters.order;
      }  else if (
        a.applicant.firstName.toLowerCase() > b.applicant.firstName.toLowerCase()
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else if (filters.sort === "doa") {
      if (
        new Date(a.dateOfApplication) < new Date(b.dateOfApplication)
      ) {
        return -1 * filters.order;
      }  else if (
        new Date(a.dateOfApplication) > new Date(b.dateOfApplication)
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else {
      if (
        a.applicant.firstName.toLowerCase() < b.applicant.firstName.toLowerCase()
      ) {
        return -1 * filters.order;
      }  else if (
        a.applicant.firstName.toLowerCase() > b.applicant.firstName.toLowerCase()
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    }
  } );

  const handleShortlist = async event => {
    await JobService.shortListUser({ 
      jobId: job._id,
      appId: event.currentTarget.value 
    });
    setData();
  }

  const handleAccept = async event => {
    await JobService.acceptUser({ 
      jobId: job._id,
      appId: event.currentTarget.value 
    });
    setData();
  }

  const handleReject = async event => {
    await JobService.rejectUser({ 
      jobId: job._id,
      appId: event.currentTarget.value 
    });
    setData();
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Dashboard
      </Button>
      <Dialog 
        scroll="body"
        fullScreen 
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes2.appBar}>
          <Toolbar>
            <IconButton 
              edge="start"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            Sort Based on: &nbsp;&nbsp;&nbsp;
            <ButtonGroup>
              <Button
                variant="contained"
                color="secondary"
                name="sort"
                value="name"
                onClick={handleClick}
              >
                Name
              </Button>
              <Button
                variant="contained"
                color="secondary"
                name="sort"
                value="doa"
                onClick={handleClick}
              >
                Date of Application
              </Button>
              <Button
                variant="contained"
                color="secondary"
                name="sort"
                value="rating"
                onClick={handleClick}
              >
                Rating
              </Button>
            </ButtonGroup>
            &nbsp;&nbsp;&nbsp;
            Ordering: &nbsp;&nbsp;&nbsp;
            <ButtonGroup>
              <Button
                variant="contained"
                color="secondary"
                name="order"
                value={1}
                onClick={handleClick}
              >
                Ascending
              </Button>
              <Button
                variant="contained"
                color="secondary"
                name="order"
                value={-1}
                onClick={handleClick}
              >
                Descending
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        {
          job.applied
            ?.filter( app => (
              app.status === "Applied" || app.status === "Shortlisted"
            ) )?.map( app => {
              return (
                <Card className={classes.root} key={app.applicant.email}>
                  <CardContent>
                    <JobProfile 
                      email={app.applicant.email} 
                      sop={app.sop} 
                      doa={app.dateOfApplication}
                    />         
                  </CardContent>
                  <CardActions>
                    {
                      app.status === "Applied"
                        ? <Button size="small"
                          value={app.applicant._id}
                          onClick={handleShortlist}
                        >
                          Shortlist
                        </Button>

                        : app.status === "Shortlisted"
                          ? <Button
                            size="small"
                            onClick={handleAccept}
                            value={app.applicant._id}
                          >
                            Accept
                          </Button>
                          : 
                        ""
                    }
                    <Button
                      size="small"
                      onClick={handleReject}
                      value={app.applicant._id}
                    >
                      Reject
                    </Button>
                  </CardActions>
                </Card>
              )
            })
        }
      </Dialog>
    </div>
  );
}
