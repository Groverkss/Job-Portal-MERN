import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Button'

import JobService from '../../services/jobs'
import ProfileService from '../../services/profile'

import JobProfile from './JobProfile'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

  useEffect( setData, []);

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

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Dashboard
      </Button>
      <Dialog 
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
          </Toolbar>
        </AppBar>
        {
          job.applied?.map( app => {
            return (
              <Card className={classes.root} key={app.applicant.email}>
                <CardContent>
                  <JobProfile email={app.applicant.email} />         
                </CardContent>
                <CardActions>
                  <Button size="small">View SOP</Button>
                  <Button size="small">Accept</Button>
                  <Button size="small">Reject</Button>
                </CardActions>
              </Card>
            )
          })
        }
      </Dialog>
    </div>
  );
}
