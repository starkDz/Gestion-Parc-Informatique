import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import MediaCard from './Items';
import FullScreenDialog from './FullDialog';
import Stats from './Stats';

const Document = () => (
    <div>
        <Stats/>
        <MediaCard />
        <FullScreenDialog/>
    </div>
);

export default {
    routeProps: {
        path: '/Document',
        component: Document
    },

    name: 'Documents',
    icon:<DescriptionIcon   fontSize='large' />,
}
