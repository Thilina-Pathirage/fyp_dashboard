import React from 'react'
import { SidebarLinks } from './SidebarLinks';
import Logo from '../Images/logo-eu.png'; // Replace with your logo'; 
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


function Sidebar() {

    const handleLogout = () => {
        // Clear all items in localStorage
        localStorage.clear();
        // Reload the window
        window.location.reload();
    };

    const history = useHistory();

    const hedelNavigate = (link) => {
        history.replace(link);

    };



    return (
        <div>
            <div className="Sidebar">
                <div className="bar-title-main">
                    <div className='center'>
                        <img src={Logo} alt="logo" style={{ width: 300, marginBottom: "10px" }} />
                    </div>
                    <hr />
                </div>
                <div className="Slide-bar-list">
                    {SidebarLinks.map((val, key) => {
                        return (
                            <li
                                className="item-row" key={key}
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => { hedelNavigate(val.link) }}
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

                            <Button onClick={handleLogout} color='error' variant='outlined' style={{ marginTop: '20px' }}>
                                Logout
                            </Button>
                        </div>
                    </div>

                </div>


                <div className="copyright">
                    <div className="hr-line">
                        <hr />
                    </div>
                    © 2023 Copyright: Eudaimonia
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
