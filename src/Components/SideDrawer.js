import React from 'react';
import ReactDOM from 'react-dom';
import './SideDrawer.css';
import { CSSTransition } from 'react-transition-group';
import { SidebarLinks } from './SidebarLinks';
import { Button } from '@mui/material';

const SideDrawer = props => {
    const handleLogout = () => {
        // Clear all items in localStorage
        localStorage.clear();
        // Reload the window
        window.location.reload();
    };

    const content = <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
    >
        <aside className="side-drawer">
            <div className="side-drawer-list" >
                <div className="Slide-bar-list2 ">
                    {SidebarLinks.map((val, key) => {
                        return (
                            <li
                                className="item-row2" key={key}
                                id={window.location.pathname === val.link ? "active2" : ""}
                                onClick={() => { window.location.pathname = val.link }}
                            >
                                <div className="item-icon">{val.icon}</div>
                                <div className="item-title">
                                    {val.title}
                                </div>
                            </li>
                        );
                    })}

                    <div className="bar-title-main">

                        <hr />
                        <div className='center'>

                            <Button onClick={handleLogout} variant='outlined' style={{ marginTop: '20px' }}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </CSSTransition>;

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;
