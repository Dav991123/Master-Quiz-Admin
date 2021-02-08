import React from 'react';
import Link from '@material-ui/core/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { base } from '../../../core/firebase/base';
import CodeIcon from '@material-ui/icons/Code';
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
                    <Link href={'/'}>
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