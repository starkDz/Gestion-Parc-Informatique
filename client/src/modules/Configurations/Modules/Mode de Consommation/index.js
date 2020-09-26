import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const ModeConsommation = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/ModeConsommation',
        component: ModeConsommation
    },
    name: 'Mode de Consommation',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
