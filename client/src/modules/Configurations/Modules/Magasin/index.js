import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';


const Magasin = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/MagasinConf',
        component: Magasin
    },
    name: 'Magasin',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
