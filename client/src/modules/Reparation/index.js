import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import MediaCard from './Items';
import ScrollableTabsButtonForce from './Tabs';
const Reparation = () => (
    <div>
      <ScrollableTabsButtonForce />
    </div>
);

export default {
    routeProps: {
        path: '/Reparation',
        component: Reparation
    },
    name: 'Maintenance',
    icon:<BuildIcon   fontSize='large' color='secondary'/>,
}
