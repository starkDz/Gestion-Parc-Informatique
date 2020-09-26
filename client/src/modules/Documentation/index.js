import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Add_New from './add_new';
const Documentation = () => (
    <Add_New/>
);

export default {
    routeProps: {
        path: '/Documentation',
        component: Documentation
    },
    name: 'Documentation',
    icon:<MenuBookIcon  fontSize='large' color='secondary'/>,
}
