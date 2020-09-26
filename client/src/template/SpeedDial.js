import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { SpeedDial } from '@material-ui/lab';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ReplyAllSharpIcon from '@material-ui/icons/ReplyAllSharp';
import PrintIcon from '@material-ui/icons/Print';
import RefreshIcon from '@material-ui/icons/Refresh';
import FullscreenSharpIcon from '@material-ui/icons/FullscreenSharp';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height:'100%',
  },
  controls: {
    margin: theme.spacing(3),
  },
  exampleWrapper: {
    position: 'relative',
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'fixed',
    '&$directionUp, &$directionLeft': {
      bottom: theme.spacing(5),
      right: theme.spacing(3),
    },
  },
  directionUp: {},
  directionLeft: {},
}));


export default function SpeedDials() {
  const classes = useStyles();
  const [direction] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  function refreshPage(){
      window.location.reload();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSetFullScreen= () => {

  };
  const handlePrint= () => {
    setOpen(false);
  };
  const handleExport= () => {
    setOpen(false);
  };

  const speedDialClassName = clsx(classes.speedDial, classes[`direction${capitalize(direction)}`]);

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={speedDialClassName}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={handleClose}
          onClick={handleClick}
          onClose={handleClose}
          onFocus={handleOpen}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          open={open}
          direction={direction}
        >

            <SpeedDialAction
              key='Exporter'
              icon={<ReplyAllSharpIcon />}
              tooltipTitle='Exporter'
              onClick={handleExport}
            />
            <SpeedDialAction
              key='Imprimer'
              icon={<PrintIcon />}
              tooltipTitle='Imprimer'
              onClick={handlePrint}
            />
            <SpeedDialAction
              key='Actualiser'
              icon={<RefreshIcon />}
              tooltipTitle='Actualiser'
              onClick={refreshPage}
            />
            <SpeedDialAction
              key='Plein Ecran'
              icon={<FullscreenSharpIcon />}
              tooltipTitle='Plein Ecran'
              onClick={handleSetFullScreen}
            />
        </SpeedDial>
      </div>
    </div>
  );
}
