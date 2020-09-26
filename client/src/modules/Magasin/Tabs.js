import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Add_New_Entry from './Entree_Magasin';
import New_Distribution from './New_Distribution';
import Home from './Home';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  content:{
    height:`calc(100vh - 136px)`,
  },
  tab:{
    textTransform: "none",
  }
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} id="ConfigurationContent">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          variant="fullWidth"
        >
        <Tab className={classes.tab} label="Situation des Magasins" icon={<EqualizerIcon />} {...a11yProps(0)} />
          <Tab className={classes.tab} label="Distributions" icon={<DoubleArrowIcon />} {...a11yProps(1)} />
          <Tab className={classes.tab} label="Entrees Au Magasin" icon={<PostAddIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.content}>
        <Home/>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.content} >
        <New_Distribution/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.content} >
        <Add_New_Entry/>
      </TabPanel>
    </div>
  );
}
