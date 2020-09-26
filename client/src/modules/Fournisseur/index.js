import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ScrollableTabsButtonForce from './Tabs';
const Fournisseur = () => (
    <div>
        <ScrollableTabsButtonForce/>
    </div>
);

export default {
    routeProps: {
        path: '/Fournisseur',
        component: Fournisseur
    },
    name: 'Fournisseurs',
    icon:<AddShoppingCartIcon   fontSize='large' />,
}
