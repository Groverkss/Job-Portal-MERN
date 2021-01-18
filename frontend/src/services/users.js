import axios from 'axios'
require('dotenv').config();

axios.defaults.baseURL = "http://localhost:3001/api"

const registerUser = async user => {
  const res = await axios
    .post('/users/register', user)
    .catch( err => {
      console.log(err);
      return {
        status: 1,
        error: "Error occured"
      };
    } );

  if (res.status !== 201) {
    console.log("Incorrect status");
    return {
      status: 1,
      error: "Status not right"
    };
  } else {
    return {
      status: 0,
    };
  };
}

const loginUser = async user => {
  const res = await axios
    .post('/users/login', user)
    .catch( err => {
      console.log(err);
      return {
        status: 1,
        error: "Error occured"
      };
    } );

  if (res.data.status === 1) {
    return {
      status: 1,
      error: res.data.error
    };
  } else {
    return res.data;
  }
}

const initDashboard = async () => {
  const res = await axios
    .get('/profile/init')
    .catch( err => {
      console.log(err);
      return {
        status: 1,
        error: "Error occured"
      };
    });

  if (res.data.status === 1) {
    return {
      status: 1,
      error: res.data.error
    };
  } else {
    return res.data;
  }
}

const setToken = () => {
  let auth = "";
  try {
    auth = window.localStorage.getItem('Authorization');
  } catch {
    auth = "";
  }

  axios.defaults.headers.common['Authorization'] = auth;
}

export default { 
  registerUser,
  loginUser,
  initDashboard, 
  setToken,
}
