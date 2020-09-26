import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const Couleur = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/Couleur',
        component: Couleur
    },
    name: 'Couleur',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
