import React from 'react';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SpeedDial from '../../template/SpeedDial';
const Messagerie = () => (
    <div>
        <SpeedDial/>
    </div>
);

export default {
    routeProps: {
        path: '/Messagerie',
        component: Messagerie
    },
    name: 'Messagerie',
    icon:<QuestionAnswerIcon   fontSize='large' color='secondary'/>,
}
