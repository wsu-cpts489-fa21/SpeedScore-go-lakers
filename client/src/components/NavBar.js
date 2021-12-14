import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'
import profilePic from '../images/DefaultProfilePic.jpg';
import AppMode from './AppMode';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      inputValue: ""
    };
    this.showProfile = this.showProfile.bind(this);
    this.search = this.search.bind(this);
  }
  showProfile = () => {
    this.props.setMode(AppMode.PROFILESETTINGS);
  }
  showSearchBox = () => {
    // console.log(this.state.mode)
    // if (this.state.mode == AppMode.COURSES) {
    const searchBox = document.getElementById("searchBox");
    if (searchBox.classList.contains("hidden")) {
      searchBox.classList.remove("hidden");
      // searchBox.addEventListener('keyup')
    } else {
      searchBox.classList.add("hidden");
    }
  }
  search = (event) => {
    this.setState({
      inputValue: event.target.value
    })
    let searchVal = event.target.value;
    searchVal = searchVal.toUpperCase(); //case insensitive
    let tr = document.getElementById("coursesTable").getElementsByTagName("tr");
    let rowText = "";
    let numVisibleRows = 0;
    for (let i = 1; i < tr.length; i++) {  //Loop through all table rows
      rowText = this.props.courses[i - 1];
      if (rowText != "") {
        if (JSON.stringify(rowText.address).toUpperCase().indexOf(searchVal) > -1 || 
            JSON.stringify(rowText.courseName).toUpperCase().indexOf(searchVal) > -1) {
          tr[i].style.display = ""; //show row
          numVisibleRows++;
        } else {
          tr[i].style.display = "none"; //hide row
        }
      }
    }
    const coursesTableCaption = document.getElementById("coursesTableCaption")
    if (numVisibleRows == 1) {
      coursesTableCaption.textContent = "Table displaying 1 speedgolf courses";
    } else {
      coursesTableCaption.textContent = "Table displaying " + numVisibleRows + " speedgolf courses";
    }
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
                value={this.state.inputValue}
                onChange={this.search}
                // onKeyUp={this.search(this.value)}
                type="search" />
                <button id="searchBtn" type="button" className="navbar-btn" 
                    aria-label="Open Rounds Search"
                    onClick={this.showSearchBox}>
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