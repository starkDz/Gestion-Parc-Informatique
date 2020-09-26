import React from 'react';
import ArchiveIcon from '@material-ui/icons/Archive';
import ScrollableTabsButtonForce from './Tabs';
const Magasin = () => (
    <div>
      <ScrollableTabsButtonForce/>
    </div>

);
export default {
    routeProps: {
        path: '/Magasin',
        component: Magasin
    },

    name: 'Magasin',
    icon:<ArchiveIcon fontSize='large' />,
}
