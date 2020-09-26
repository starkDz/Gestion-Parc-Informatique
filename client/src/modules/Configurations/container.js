import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import MediaCard from './Items';
import Add_New from './add_new';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CenteredTabs from './Tabs';
import modules from './Modules'; // All the parent knows is that it has modules ...

import Tooltip from '@material-ui/core/Tooltip';
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
  },
  add:{
    padding: theme.spacing(3),
  }
}));

export default function NestedList() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Magasin');
  return (
    <div className={classes.root}>
      <Router>
      <main className={classes.content}>
              {modules.map(module => (
                <Route {...module.routeProps} key={module.name} />
              ))}
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
          <List>
            {modules.map(module => ( // with a name, and routes

                <ListItem button key={module.name} component={Link} to={module.routeProps.path} onClick={() => setCurrentTab(module.name)} >
                  <ListItemIcon >{module.icon}</ListItemIcon>
                  <ListItemText primary={module.name}  />
                </ListItem>

            ))}
          </List>
      </Drawer>
</Router>
    </div>
  );
}
