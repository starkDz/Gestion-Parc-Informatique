import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CenteredTabs from './Tabs';

const TypeArticle = () => (
    <div>
        <CenteredTabs/>
    </div>
);

export default {
    routeProps: {
        path: '/TypeArticle',
        component: TypeArticle
    },
    name: "Type d'Article",
    icon:<ArrowBackIosIcon fontSize='large' />,
}
