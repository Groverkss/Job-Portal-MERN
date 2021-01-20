import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ProfileService from '../../services/profile'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: "100%",
    },
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
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  paperContentAbove: {
    marginTop: theme.spacing(8),
  },
  paperContentBelow: {
    marginBottom: theme.spacing(4),
  },
}));

const DialogForm = () => {
  const [ open, setOpen ] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Education
    </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave End Date as Unchanged incase there is no End Date
          </DialogContentText>
          <Grid contaner>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Institute Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                defaultValue="1900-01-01"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                defaultValue="1900-01-01"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const EditForm = () => {
  const classes = useStyles();

  const [ profile, setProfile ] = useState({});
  const [ isLoading, setLoading ] = useState(true);

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

  const handleChange = event => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = () => {
    console.log(profile);
  }

  let renderSection = "";
  let renderContainer = "";

  if (profile.type === 0) {
    renderSection = (
      <>
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
              <DialogForm />
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
            <ListItem>
              <Button variant="contained" color="primary">
                Add Skill
              </Button>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3} className={classes.content}>
          <Button variant="contained" color="primary">
            Add Resume
          </Button>
        </Grid>
      </>
    )
  } else {
    renderContainer = (
      <>
        <Grid item xs={12} className={classes.content}>
          <TextField 
            id="outlined-basic" 
            label="Contact" 
            variant="outlined"
            fullWidth
            defaultValue="1234567890"
          />
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <TextField 
            multiline
            id="outlined-basic" 
            label="Contact" 
            variant="outlined"
            fullWidth
            defaultValue="This user has no Bio for now"
          />
        </Grid>
      </>
    );
  }

  if (isLoading) {
    return ""
  } else {
    return (
      <div className={classes.root}>
        <Paper elevation={6}>
          <Container component="main" maxWidth="xs" >
            <div className={classes.paperContentAbove}>
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.avatarGrid}>
                  <Avatar
                    alt={profile.firstName}
                    src={profile.image}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.formFieldLeft}>
                  <TextField 
                    label="First Name" 
                    variant="outlined"
                    fullWidth
                    value={profile.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.formFieldRight}>
                  <TextField 
                    label="Last Name" 
                    variant="outlined"
                    fullWidth
                    value={profile.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12} className={classes.content}>
                  <TextField 
                    label="Email" 
                    variant="outlined"
                    fullWidth
                    disabled
                    defaultValue={profile.email}
                  />
                </Grid>
                {renderContainer}
              </Grid>
            </div>
          </Container>
          <div className={classes.paperContentBelow}>
            <Grid container spacing={1} className={classes.paperContentBelow}>
              {renderSection}
            </Grid>
            <Grid item xs={12} className={classes.content}>
              <Button onClick={handleSubmit} variant="contained" color="secondary">
                Save Changes 
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

const App = ({ profileDets }) => {
  return <EditForm profileType={profileDets.profileType} />;
}

export default App;
