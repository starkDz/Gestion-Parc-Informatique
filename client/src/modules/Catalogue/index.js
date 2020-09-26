import React from 'react';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import MediaCard from './Items';
import Stats from './Stats';
const Catalogue = () => (
    <div>
      <Stats/>
      <MediaCard/>
    </div>
);

export default {
    routeProps: {
        path: '/Catalogue',
        component: Catalogue
    },
    name: 'Catalogue',
    icon:<LaptopMacIcon  fontSize='large' />,
}
