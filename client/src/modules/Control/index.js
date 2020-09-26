import React from 'react';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SpeedDial from '../../template/SpeedDial';
const Control = () => (
    <div>
        <SpeedDial/>
    </div>
);

export default {
    routeProps: {
        path: '/Control',
        component: Control
    },
    name: 'Control a distance',
    icon:<SportsEsportsIcon fontSize='large' color='secondary'/>,
}
