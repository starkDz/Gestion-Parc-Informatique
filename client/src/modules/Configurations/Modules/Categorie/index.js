import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const Categorie = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/Categorie',
        component: Categorie
    },
    name: 'Categorie',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
