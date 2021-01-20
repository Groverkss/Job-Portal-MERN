import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoginService from '../services/users.js'
import { useHistory } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%"
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [ register, setRegister ] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    type: 0,
  });

  const handleChange = (event) => {
    setRegister({
      ...register, 
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async event => {
    const res = await LoginService.registerUser(register);
    if (res.status === 0) {
      /* Success */
      history.push('/login');
    } else {
      console.log(res.error);
      setRegister({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        type: 0,
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                onChange={handleChange}
                value={register.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required']}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                onChange={handleChange}
                value={register.lastName}
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required']}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                onChange={handleChange}
                value={register.email}
                variant="outlined"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'email is not valid']}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                onChange={handleChange} value={register.password}
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required']}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="type"
                  value={register.type}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Applicant</MenuItem>
                  <MenuItem value={1}>Recruiter</MenuItem>
                </Select>
                <FormHelperText>Select your use case</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}

const App = () => {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
