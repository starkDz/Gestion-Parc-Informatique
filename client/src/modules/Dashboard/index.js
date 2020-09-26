import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Add_New from './add_new';
const Dashboard = () => <Add_New />;

export default {
  routeProps: {
    path: '/Dashboard',
    component: Dashboard,
  },
  name: 'Dashboard',
  icon: <HomeIcon fontSize='large' />,
};
