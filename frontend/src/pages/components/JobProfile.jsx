import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
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
    },
  },
  content: {
    display: "flex",
    justifyContent: "center"
  },
  divider: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%"
  },
}));

const JobProfile = ({ email, sop, doa }) => {
  const classes = useStyles();

  const [ profile, setProfile ] = useState({});
  const [ isLoading, setLoading ] = useState({});

  useEffect( () => {
    const setData = async () => {
      const res = await ProfileService.getApplicant(email);
      setProfile(res);
      setLoading(false);
    }

    setData();
  }, []);

  let renderSection = "";

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
            profile.education?.map( (val, index) => {
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
            profile.skills?.map( (skill, index) => (
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

        </List>
      </Grid>
      <Grid item xs={3} className={classes.content}>
        <Link href={profile.resume} target="_blank">
          <Button variant="contained" color="primary">
            Resume
          </Button>
        </Link>
      </Grid>
    </>
  )

  if (isLoading) {
    return "";
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.paperContent}>
          <Grid container>
            <Grid item xs={12} className={classes.content}>
              <Typography>
                {profile.firstName} {profile.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              SOP: {sop} <br />
              Date Of Application: {new Date(doa).toString()} <br />
              Rating: 
              <Rating
                name="read-only"
                value={(profile.rating.ratingSum/profile.rating.ratingTotal)} 
                readOnly
              />
            </Grid>
            <br />
            {renderSection}
          </Grid>
        </div>
      </div>
    );
  }
}

export default JobProfile;
