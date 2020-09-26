import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';


const SansRef = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/SansRef',
        component: SansRef
    },
    name: 'Sans Reference',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
