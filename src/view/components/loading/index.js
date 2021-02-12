import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <div className="loading-container">
            <div >
                <CircularProgress />
            </div>
        </div>

    )
};

export default Loading;