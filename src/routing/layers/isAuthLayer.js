import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AdminContext from '../../context/adminContext';

const IsAuthLayer = ({children}) => {
    const { state: { isAuth } } = useContext(AdminContext);
    return (
        <>
            {isAuth ? children : <Redirect to={'/login'}/>}
        </>
    )
}

export default withRouter(IsAuthLayer);