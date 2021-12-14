import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'
import profilePic from '../images/DefaultProfilePic.jpg';
import AppMode from './AppMode';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode
    };
    this.showProfile = this.showProfile.bind(this);
  }
  showProfile = () => {
    this.props.setMode(AppMode.PROFILESETTINGS);
  }

    render() {
       return (
        <header className="navbar">  
        <a id="sLink" className="skip-link" tabIndex="0">
         Skip to content</a>
         {this.props.mode != AppMode.LOGIN && !this.props.modalOpen ?
         ( 
           this.props.isDetailsView ? 
          <button id="leftArrowBtn" type="button" className="navbar-btn" 
            title="leftArrowBtn" 
            aria-label="Actions" aria-haspopup="true"
            onClick={()=>{this.props.isEditDetailsView ? this.props.editDetailsCallBack() : this.props.detailsCallBack()}}>
            <FontAwesomeIcon icon= {['fas', 'arrow-left']} className="navbar-btn-icon"></FontAwesomeIcon>
          </button> :
         <button id="menuBtn" type="button" className="navbar-btn" 
            title="Menu" aria-controls="sideMenu" 
            aria-label="Actions" aria-haspopup="true" 
            aria-expanded={this.props.menuOpen ? "true" : "false"}
            onClick={this.props.toggleMenuOpen}>
            <FontAwesomeIcon 
              icon={this.props.menuOpen ? "times" : "bars"} className="navbar-btn-icon"/>
          </button>) : null}
          <img src={logo} className="navbar-app-icon" 
            alt="SpeedScore logo" />
           <h1 id="appName" className="navbar-title">
             {((this.props.isEditDetailsView && 'Edit Scoring Data') || (this.props.isDetailsView && 'Data for ' + this.props.displayName)) || 'SpeedScore'}
           </h1> 
           
           {this.props.mode != AppMode.LOGIN && !this.props.modalOpen ?
             <div className="navbar-right-items">
                <input id="searchBox" className="form-control hidden" 
                aria-label="Search Rounds" size="30"
                type="search" />
                <button id="searchBtn" type="button" className="navbar-btn" 
                    aria-label="Open Rounds Search">
                    <FontAwesomeIcon icon="search" className="navbar-btn-icon"/>
                </button>
                <button id="profileBtn" type="button" 
                  onClick={() => this.showProfile()} 
                  className="navbar-btn navbar-profile-btn" 
                  aria-label="Account and Profile Settings"
                  style={{backgroundImage: this.props.userData.identityData.profilePic === "" ? 
                            `url(${profilePic})` : 
                            `url(${this.props.userData.identityData.profilePic})`}}>
                </button> 
              </div> : 
              <div className="navbar-right-items"></div>}
      </header>
    ); 
  }
}

export default NavBar;