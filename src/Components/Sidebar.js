import React from 'react'
import { SidebarLinks } from './SidebarLinks';

function Sidebar() {
    return (
        <div>
            <div className="Sidebar">
                <div className="bar-title-main">
                    <div className="bar-title-inner">
                        Eudaimonia
                    </div>
                    <hr />
                </div>
                <div className="Slide-bar-list">
                    {SidebarLinks.map((val, key) => {
                        return (
                            <li
                                className="item-row" key={key}
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => { window.location.pathname = val.link }}
                            >
                                <div className="item-icon">{val.icon}</div>
                                <div className="item-title">
                                    {val.title}
                                </div>
                            </li>
                        );
                    })}
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
