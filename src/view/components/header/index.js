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
                <img 
                    src={'https://www.basic.am/static/media/white-logo.e806c809.svg'}
                    alt={'basic'}
                />
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