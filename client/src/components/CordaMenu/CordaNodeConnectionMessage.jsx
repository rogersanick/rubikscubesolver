import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CordaNodeConnectionMessage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={3500} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={ props.connected ? "success" : "error" }>
          { props.connected ? "Connected" : "Failed to connect" }
        </Alert>
      </Snackbar>
    </div>
  );
}