import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { base } from '../../../core/firebase/base';
import { Link } from 'react-router-dom';
import Menu from './menu';
import './index.css';

const Header = () => {
    const handleLogout = () => {
        base.auth().signOut()
        .then(resp => {
            console.log(resp)
        })
    };

    return (
        <div className="header-content">
            <div className="left-bar">
                <Menu />
                <div className="quiz-link-content">
                    <Link to={'/'}>
                        Quiz Admin
                    </Link>
                </div>
            </div>
        
          
            <div className={'logout-content'}>
                <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon /> Logout
                </MenuItem>
            </div>
        </div>
    )
}

export default Header;