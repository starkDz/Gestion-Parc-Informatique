import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const Etat = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/Etat',
        component: Etat
    },
    name: 'Etat',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
