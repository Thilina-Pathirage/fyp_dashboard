import React, { useState } from 'react';
import './Sidebar.css';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import './MainNavigation.css'

function MainNavigation() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    }
    return (
        <React.Fragment>
            {drawerIsOpen ? (<Backdrop onClick={closeDrawer} />) : null}
            <SideDrawer show={drawerIsOpen} />
            

            <button className="mobile-menu-btn" onClick={openDrawer}>
                <MenuOutlinedIcon />
            </button>
        </React.Fragment>
    )
}

export default MainNavigation;
