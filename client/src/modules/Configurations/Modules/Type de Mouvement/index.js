import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';


const TypeMouvement = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/TypeMouvement',
        component: TypeMouvement
    },
    name: 'Type de Mouvement',
    icon:<ArrowBackIosIcon fontSize='large' />,
}
