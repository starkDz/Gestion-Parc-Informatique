import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import MediaCard from './Items';
import NestedList from './container';

const Configurations = () => (
    <div>
      <NestedList />
    </div>
);

export default {
    routeProps: {
        path: '/Configurations',
        component: Configurations
    },
    name: 'Configurations',
    icon:<SettingsIcon fontSize='large' />,
}
