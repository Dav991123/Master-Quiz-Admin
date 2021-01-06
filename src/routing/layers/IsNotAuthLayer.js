import React, { useContext } from 'react';
import AdminContext from '../../context/adminContext';
import { Redirect, withRouter } from 'react-router-dom';
import { defaultPath } from '../router';

const IsNotAuthLayer = ({ children, ...props }) => {
  const { state: { isAuth } } = useContext(AdminContext);

  return (
    <>
      {!isAuth ? children : <Redirect to={defaultPath}/>}
    </>
  )
};



export default withRouter(IsNotAuthLayer);