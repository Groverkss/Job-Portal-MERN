import UserService from './users'
import axios from 'axios'

const addJob = async job => {
  const res = await axios
    .post('/job/add', job)
    .catch( err => {
      console.log(err);
      return {
        status: 1,
      };
    } );

  if (res.data) {
    return {
      status: 0,
      ...res.data,
    }
  } else {
    return res;
  }
}

const getAll = async job => {
  UserService.setToken();
  const res = await axios
    .get('/job/all')
    .catch( err => {
      console.log(err);
      return {
        status: 1,
      };
    } );

  return res.data;
  
}

const exportModule = {
  addJob,
  getAll,
}

export default exportModule;
