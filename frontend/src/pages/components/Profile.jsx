import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader'
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { useState, useEffect } from 'react'

import ProfileService from '../../services/profile'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: "100%",
    },
  },
  paperContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  content: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  divider: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%"
  },
}));

const Profile = () => {
  const classes = useStyles();

  const [ profile, setProfile ] = useState({});
  const [ isLoading, setLoading ] = useState({});

  useEffect( () => {
    const setData = async () => {
      const res = await ProfileService.getProfile();
      if (res.status === 0) {
        setProfile(res);
      }
      setLoading(false);
    }

    setData();
  }, []);
  
  let renderSection = "";

  if (profile.type === 0) {
    renderSection = (
      <>
        <Grid item xs={12} className={classes.content}>
          <Rating
            name="read-only"
            value={(profile.rating.ratingSum/profile.rating.ratingTotal)} 
            readOnly
          />
        </Grid>
        <Grid item xs={6} className={classes.content}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Education
              </ListSubheader>
            }>

            <ListItem>
              <ListItemText
                primary="Narain Public School"
                secondary="2017 - 2019"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="International Institute of Information Technology, Hyderabad"
                secondary="2019 - Present"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} className={classes.content}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Skills
              </ListSubheader>
            }>

            <ListItem>
              <ListItemText
                primary="JavaScript"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Python"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="C/C++"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Bash"
              />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item xs={3} className={classes.content}>
          <Link href={profile.resume}>
            <Button variant="contained" color="primary">
            Resume
            </Button>
          </Link>
        </Grid>
      </>
    )
  } else {
    renderSection = (
      <>
        <Grid item xs={12} className={classes.content}>
          <Typography>
            Contact : 1234567890
          </Typography>
        </Grid>
        <Divider variant="middle" className={classes.divider}/>
        <Grid item xs={12} className={classes.content}>
          <Typography>
            This user has no Bio for now
          </Typography>
        </Grid>
      </>
    );
  }

  if (isLoading) {
    return "";
  } else {
    return (
      <div className={classes.root}>
        <Paper elevation={6}>
          <div className={classes.paperContent}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h6" variant="h4">
                  {profile.firstName} {profile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Avatar 
                  alt={profile.firstName}
                  src={profile.image}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h1" variant="subtitle1">
                  { profile.email } | { profile.type ? "Recruiter" : "Applicant"}
                </Typography>
              </Grid>
              {renderSection}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Profile;
