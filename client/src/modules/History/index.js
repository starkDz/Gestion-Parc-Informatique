import React from 'react';
import HistoryIcon from '@material-ui/icons/History';
import SpeedDial from '../../template/SpeedDial';
const History = () => (
    <div>
        <SpeedDial/>
    </div>
);

export default {
    routeProps: {
        path: '/History',
        component: History
    },
    name: 'Activites Recentes',
    icon:<HistoryIcon  fontSize='large' color='secondary'/>,
}
