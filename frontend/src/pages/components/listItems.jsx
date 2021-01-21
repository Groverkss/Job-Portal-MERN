import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const applicantListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="myprofile" onClick={handlePage} button>
        <ListItemIcon>
        <DashboardIcon />
        </ListItemIcon>
      <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="joblistings" onClick={handlePage} button>
        <ListItemIcon>
        <ShoppingCartIcon />
        </ListItemIcon>
      <ListItemText primary="Job Listings" />
      </ListItem>
      <ListItem value="myapplication" onClick={handlePage} button>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
      <ListItemText primary="My Applications" />
      </ListItem>
      <ListItem value="editprofile" onClick={handlePage} button>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
      <ListItemText primary="Edit Profile" />
      </ListItem>
    </div>
  );
}

export const recruitListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="myprofile" onClick={handlePage} button>
        <ListItemIcon>
        <DashboardIcon />
        </ListItemIcon>
      <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="joblistings" onClick={handlePage} button>
        <ListItemIcon>
        <ShoppingCartIcon />
        </ListItemIcon>
      <ListItemText primary="Create Job" />
      </ListItem>
      <ListItem value="createjob" onClick={handlePage} button>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
      <ListItemText primary="My Applications" />
      </ListItem>
      <ListItem value="editprofile" onClick={handlePage} button>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
      <ListItemText primary="Edit Profile" />
      </ListItem>
    </div>
  );
}
