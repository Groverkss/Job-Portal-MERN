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

import ProfileService from '../../services/profile'
import { EducationDialogForm, SkillDialogForm } from '../components/FormDialog'

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


const EditForm = () => {
  const classes = useStyles();

  const [ profile, setProfile ] = useState({});
  const [ isLoading, setLoading ] = useState(true);
  const [ education, setEducation ] = useState({
    name: "",
    startDate: "1900-01-01",
    endDate: "1900-01-01",
  });
  const [ skill, setSkill ] = useState("");

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

  const handleSubmit = async () => {
    const res = await ProfileService.updateProfile(profile);

    if (res.status === 1) {
      console.log(res.error); 
    } else {
      console.log(res.content);
    }
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
            {
              profile.education.map( (val, index) => {
                const formatDate = (date) => {
                  let formattedDate = new Date(date);
                  formattedDate = formattedDate.toDateString().split(" ");
                  formattedDate = `${formattedDate[1]} ${formattedDate[3]}`

                  if (formattedDate === "Jan 1900") {
                    return "Present";
                  } else {
                    return formattedDate;
                  }
                }

                return (
                  <div key={`${val.name} ${val.startDate} ${val.endDate}`}>
                    { index ? <Divider /> : "" }
                    <ListItem >
                      <ListItemText
                        primary={val.name}
                        secondary={`
                    ${formatDate(val.startDate)}
                    - 
                    ${formatDate(val.endDate)}`}
                      />
                    </ListItem>
                  </div>
                )
              } )
            }
            <ListItem>
              <EducationDialogForm
                education={education}
                setEducation={setEducation}
                profile={profile}
                setProfile={setProfile}
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
            {
              profile.skills.map( (skill, index) => (
                <>
                  { index ? <Divider /> : "" }
                  <ListItem>
                    <ListItemText
                      primary={skill}
                    />
                  </ListItem>
                </>
              ))
            }
            <ListItem>
              <SkillDialogForm 
                skill={skill}
                setSkill={setSkill}
                profile={profile}
                setProfile={setProfile}
              />
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
            label="Contact" 
            variant="outlined"
            fullWidth
            name="contact"
            value={profile.contact}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <TextField 
            multiline
            rows={6}
            label="Bio" 
            variant="outlined"
            fullWidth
            name="bio"
            onChange={handleChange}
            value={profile.bio}
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
