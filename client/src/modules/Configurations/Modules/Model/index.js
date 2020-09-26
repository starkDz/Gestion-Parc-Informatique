import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const Model = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/Model',
        component: Model
    },
    name: 'Model',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
