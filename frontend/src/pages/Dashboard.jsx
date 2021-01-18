import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Dashboard from './components/DashboardSkeleton'
import ApiService from '../services/users.js'

import MyProfile from './subpages/MyProfile.jsx'
import JobListing from './subpages/JobListing.jsx'
import MyApplications from './subpages/MyApplications.jsx'

const App = () => {
  const history = useHistory();
  const [ page, setPage ] = useState("profile");

  let profileType;
  let firstName;
  let lastName;

  const handlePage = (event) => {
    const value = event.currentTarget.getAttribute('value')
    setPage(value);
  }

  useEffect( () => {
    const setData = async () => {
      ApiService.setToken();
      const res = await ApiService.initDashboard();
      profileType = res.type;
      firstName = res.firstName;
      lastName = res.lastName;
      if (res.status === 1) {
        history.push('/login');
      }
    }
    setData();
  }, []);

  let content = "";
  if (page === "myprofile") {
    content = <MyProfile />
  } else if (page === "joblistings") {
    content = <JobListing /> 
  } else if (page === "myapplication") {
    content = <MyApplications />
  }

  return (
    <>
      <Dashboard 
        title={page[0].toUpperCase() + page.substring(1)}
        profileType={profileType}
        content={content}
        handlePage={handlePage}
      />
    </>
  );
}

export default App;
