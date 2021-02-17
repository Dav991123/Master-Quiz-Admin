import React, { useEffect, useState, useRef } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { base } from '../../../../core/firebase/base';
import { Link } from 'react-router-dom';
import Menu from './menu';
import { useLocation } from  'react-router-dom';
import { ROUTE_CONSTANTS } from '../../../../core/constants/routeConstants';
import './index.css';

const Header = () => {
    const prevScrollpos = window.pageYOffset;
    const headerRef = useRef(null);
    const [scrolling, setScrolling] = useState(0);

    const handleLogout = () => {
        base.auth().signOut()
        .then(resp => {
            console.log(resp)
        })
    };

    useEffect(() => {
        window.onscroll = e => {
            const currentScrollPos = window.pageYOffset;
            setScrolling(e.target.documentElement.scrollTop );
            if(prevScrollpos > currentScrollPos) {
                headerRef.current.style.top = '0px';
            }else {
                headerRef.current.style.top = '-100px';
            }
        }

      }, [scrolling]);

    const { pathname } = useLocation();
    return (
        <div className="header-content" id="header" ref={headerRef}>
            <div className="left-bar">
                <Menu />
                <div className="quiz-link-content">
                    <Link to={'/'}>
                        Quiz Admin
                    </Link>
                </div>
            </div>
        
            <div id="header-button-content" className="header-button-content">
                {
                    ROUTE_CONSTANTS.QUESTIONS === pathname ? (
                    
                        <div className={'logout-content'}>
                            <MenuItem onClick={handleLogout}>
                                <ExitToAppIcon /> Logout
                            </MenuItem>
                        </div>
                    ): null
                }
               
            </div>
           
        </div>
    )
}

export default Header;