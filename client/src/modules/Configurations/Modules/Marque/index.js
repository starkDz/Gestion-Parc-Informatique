import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const Marque = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/Marque',
        component: Marque
    },
    name: 'Marque',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
