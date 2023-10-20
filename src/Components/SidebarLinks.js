import React from 'react'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

export const SidebarLinks = [
    {
        title: "Dashboard",
        icon: <DashboardOutlinedIcon/>,
        link: '/'
    },
    {
        title: "Employees",
        icon: <PeopleAltOutlinedIcon/>,
        link: '/employees'
    },
    {
        title: "Time Off",
        icon: <TodayOutlinedIcon/>,
        link: '/leaves'
    },
    {
        title: "Complaints",
        icon: <ErrorOutlineOutlinedIcon/>,
        link: '/complaints'
    },
    {
        title: "Logout",
        icon: <ExitToAppOutlinedIcon/>,
        link: '/logout'
    },
]
