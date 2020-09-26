import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const SanNumSerie = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/SanNumSerie',
        component: SanNumSerie
    },
    name: 'Sans Numero de Serie',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
