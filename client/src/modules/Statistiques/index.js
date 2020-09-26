import React from 'react';
import TimelineIcon from '@material-ui/icons/Timeline';

const Statistique = () => (
    <div>Statistique Module
    </div>

);

export default {
    routeProps: {
        path: '/Statistique',
        component: Statistique
    },

    name: 'Statistique',
    icon:<TimelineIcon   fontSize='large' color='secondary'/>,
}
