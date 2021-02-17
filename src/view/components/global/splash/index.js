import React, { memo, useEffect, useContext, Suspense, useState } from 'react';
import AdminContext from '../../../../context/adminContext';
import {base} from '../../../../core/firebase/base';
import { makeStyles } from '@material-ui/core/styles';
import { SET_IS_AUTH } from '../../../../core/constants/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
}));

const Splash = ({children, history}) => {
    const classes = useStyles();

    const { dispatch } = useContext(AdminContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        base.auth().onAuthStateChanged(user => {
            if(user) {
                dispatch({
                    type: SET_IS_AUTH,
                    payload: true
                })
                setIsLoading(false)
            }else {
                history.push('/login')
                dispatch({
                    type: SET_IS_AUTH,
                    payload: false
                })
                setIsLoading(false)

            }
        })
    }, [dispatch, history])

    return (
        <div>
            {
                isLoading ? (
                    <div className={classes.root}>
                        <CircularProgress />
                    </div>
                ): (
                    <Suspense fallback={<p>Loading...</p>}>
                        {children}
                    </Suspense>
                )
            }
           
        </div>
    )
};

export default withRouter(memo(Splash));