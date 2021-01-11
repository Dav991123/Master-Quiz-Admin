import React from 'react';
import Link from '@material-ui/core/Link';
import './index.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { base } from '../../../core/firebase/base';

const Header = () => {
    const handleLogout = () => {
        base.auth().signOut()
        .then(resp => {
            console.log(resp)
        })
    };

    return (
        <div className={'header-content'}>
            <Link href={'https://www.basic.am/'}>
              
            </Link>

            <div className={'logout-content'}>
                <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon /> Logout
                </MenuItem>
            </div>
        </div>
    )
}

export default Header;