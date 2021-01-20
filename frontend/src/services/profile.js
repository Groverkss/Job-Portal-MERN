import UserService from './users'
import axios from 'axios'

const getProfile = async () => {
  UserService.setToken();
  const res = await axios
    .get('/profile/details')
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

const exportModule = {
  getProfile, 
}

export default exportModule;
