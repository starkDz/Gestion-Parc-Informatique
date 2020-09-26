import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';


const UniteMesure = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/UniteMesure',
        component: UniteMesure
    },
    name: 'Unite de Mesure',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
