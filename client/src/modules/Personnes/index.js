/*

Control totale sur l utilisateur
surveille toutes les activite de l utilisateur
activer et desactiver l utilisateur
associer un profile pour l utilisateur

*/

import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ScrollableTabsButtonForce from './Tabs';
const Personnes = () => (
    <div>
      <ScrollableTabsButtonForce/>
    </div>
);

export default {
    routeProps: {
        path: '/Personnes',
        component: Personnes
    },
    name: 'Utilisateur',
    icon:<PersonIcon  fontSize='large' />,
}
