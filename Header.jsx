import React from "react";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import './Header.css';
import { connect } from "react-redux";


function Header (props) {

    const openDrawer = () => {
        props.listenToHeader()
    }

    return(
        <div className="header-block">
            <div className="left-icon">
                <div className="menu-icon"> <MenuSharpIcon onClick={openDrawer}/> </div>
                <div className='keep-icon'><img src='./keepLogo.png' alt="keepLogo"/></div>
                <div className='keep-text'><span>{props.label}</span></div>
            </div>
        
            <div className="search-bar">
                <SearchOutlinedIcon />
                <input className="textarea" type="text" placeholder="Search" />
                   
            </div>

            <div className="right-icon">
                <div className="refresh-icon"> <RefreshOutlinedIcon /></div>
                <div className="list-view-icon"> <ViewAgendaOutlinedIcon /></div>
                <div className="setting-icon"><SettingsOutlinedIcon /></div>
                <div className="google-app-icon"> <AppsOutlinedIcon /></div>
                <div className="user-icon"><AccountCircleOutlinedIcon /></div>
            </div>       
        </div>
    )
    

}

const mapStateToProps = (state)=> {
    return {
        label: state.drawerReducer.label
    }
}

export default connect(mapStateToProps)(Header)
