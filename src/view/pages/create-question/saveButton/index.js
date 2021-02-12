import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';

import './index.css';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  
const SaveButton = ({ handleSave, validation }) => {
    const classes = useStyles();

    const ColorButton = withStyles((theme) => ({
        root: {
            color: '#673ab7',
            backgroundColor: '#f7f7f7;',
            '&:disabled': {
                color: '#dad9d9',
            },
            '&:hover': {
            backgroundColor: '#dad9d9',
            },
        },
    }))(Button);

    return ReactDOM.createPortal(
        <div className="save-button">
            <ColorButton
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
                onClick={handleSave}
                disabled={validation}
                startIcon={<SaveIcon />}
            >
                Save
            </ColorButton>
        </div>,
        document.getElementById('header-button-content')
    )
};

export default SaveButton;