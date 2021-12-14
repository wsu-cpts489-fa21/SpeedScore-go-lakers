import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus, faArrowLeft, faUndo} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import ProfileSettings from './ProfileSettings.js';
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub, faGoogle, faArrowLeft, faUndo);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  modeTemp: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    roundCount: 0},
                    courses: {
                      courses: [],
                      courseCount: 0
                    },
                  authenticated: false,
                  isDetailsView: false,
                  isEditDetailsView: false};
    this.detailsCallBack = null;
    this.editDetailsCallBack = null;
  }

  componentDidMount() {
    document.addEventListener("click",this.handleClick, true);
    this.getCourses();
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.logInUser(obj.user);
          }
        })
    } 
  }

  detailsBackFunction = (callBack) =>{
      this.detailsCallBack = callBack
    }

  editDetailsBackFunction = (callBack) =>{
      this.editDetailsCallBack = callBack
    }

  changeIsDetailsView = () =>{
    this.setState({isDetailsView: !this.state.isDetailsView})
  }

  changeIsEditDetailsView = () =>{
    this.setState({isEditDetailsView: !this.state.isEditDetailsView})
  }
  

  /*
   handleClick -- document-level click handler assigned in componentDidMount()
   using 'true' as third param to addEventListener(). This means that the event
   handler fires in the _capturing_ phase, not the default _bubbling_ phase.
   Thus, the event handler is fired _before_ any events reach their lowest-level
   target. If the menu is open, we want to close
   it if the user clicks anywhere _except_ on a menu item, in which case we
   want the menu item event handler to get the event (through _bubbling_).
   We identify this border case by comparing 
   e.target.getAttribute("role") to "menuitem". If that's NOT true, then
   we close the menu and stop propagation so event does not reach anyone
   else. However, if the target is a menu item, then we do not execute 
   the if body and the event bubbles to the target. 
  */
  
  handleClick = (e) => {
    if (this.state.menuOpen && e.target.getAttribute("role") !== "menuitem") {
      this.toggleMenuOpen();
      e.stopPropagation();
    }
  }

  /*
   * Menu item functionality 
   */
  logOut = () => {
    this.setState({mode:AppMode.LOGIN,
                   userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    },
                   authenticated: false,
                   menuOpen: false});
  }
  
   //User interface state management methods
   
  setMode = (newMode) => {
    let modeTemp = this.state.mode
    if (newMode === AppMode.PROFILESETTINGS) {
      this.setState({modeTemp: modeTemp});
    }
    this.setState({mode: newMode});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  //Account Management methods
   
  accountExists = async(email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  authenticateUser = async(id, pw) => {
    const url = "/auth/login?username=" + id + 
      "&password=" + pw;
    const res = await fetch(url,{method: 'POST'});
    if (res.status == 200) { //successful login!
      return true;
    } else { //Unsuccessful login
      return false;
    } 
  }

  logInUser = (userObj) => {
      this.setState({userData: userObj,
                     mode: AppMode.FEED,
                     authenticated: true});
  }

  createAccount = async(data) => {
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'POST',
        body: JSON.stringify(data)}); 
    if (res.status == 201) { 
        return("New account created with email " + data.accountData.id);
    } else { 
        const resText = await res.text();
        return("New account was not created. " + resText);
    }
  }

  updateUserData = async(data) => {
    localStorage.setItem(data.accountData.email,JSON.stringify(data));
    this.setState({userData: data});
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'PUT',
        body: JSON.stringify(data)}); 
    if (res.status == 201) { 
        return("Account was updated with email " + data.accountData.id);
    } else { 
        const resText = await res.text();
        return("Account was not updated. " + resText);
    }
  }

  //Round Management methods

  addRound = async(newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                                },
                          method: 'POST',
                          body: JSON.stringify(newRoundData)
                }); 
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData});
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
  }

  updateRound = async(newRoundData,editId) => {
    let newRounds = [...this.state.userData.rounds];
    newRounds[editId] = newRoundData;
    const newUserData = {
      accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: this.state.userData.roundCount
    }
    let newUserData1 = {...newUserData}
    newUserData1.editId = editId
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
      method: 'PUT',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'PUT',
              body: JSON.stringify(newUserData1)
    }); 
    if (res.status == 201) { 
      this.setState({userData: newUserData}); 
      return("New round updated.");
    } else { 
      const resText = await res.text();
      return("New Round could not be updated. " + resText);
    }

  }

  deleteRound = async(deleteId) => {
    let newRounds = [...this.state.userData.rounds];
    newRounds.splice(deleteId,1)
    const newUserData = {
      accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: this.state.userData.roundCount
    }
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
      method: 'DELETE',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'DELETE',
              body: JSON.stringify({index: deleteId})
    }); 
    if (res.status == 201) { 
      this.setState({userData: newUserData}); 
      return("The round is deleted.");
    } else { 
      const resText = await res.text();
      return("The Round could not be deleted. " + resText);
    }
  }

  getCourses = async() => {
    
    const url = "/courses";
    let res = await fetch(url, {
      method: 'GET',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'GET'
    }); 
    let data = await res.json();
    if (res.status == 201) { 
      let coursesList = JSON.parse(data);
      if (Object.keys(coursesList).length >= 100) {
        coursesList = Object.fromEntries(Object.entries(coursesList).slice(0, 100));
        this.setState({
          courses: {
            courses: coursesList
          }
        })
        return("Get first 100 courses.");
      } else {
        this.setState({
          courses: {
            courses: coursesList
          }
        })
        return("Get all courses.");
      }
    } else { 
      const resText = await res.text();
      return("All courses could not be get. " + resText);
    }
  }

  addCourse = async(newCourseData) => {
    console.log(newCourseData)
    const url = "/courses";
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                                },
                          method: 'POST',
                          body: JSON.stringify(newCourseData)
                }); 
    if (res.status == 201) { 
      const newCourses = [...this.state.courses.courses];
      newCourses.push(newCourseData);
      this.setState({
        courses: {
          courses: newCourses
        }
      })
      return("New course added.");
    } else { 
      const resText = await res.text();
      return("New course could not be added. " + resText);
    }
  }

  updateCourse = async(newCourseData, editId) => {
    let newCourses = [...this.state.courses.courses];
    newCourses[editId] = newCourseData;
    let id = newCourses[editId]._id
    const url = "/courses";
    let res = await fetch(url, {
      method: 'PUT',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'PUT',
              body: JSON.stringify({
                courses: newCourses,
                newCourseData: newCourseData,
                editId: editId,
                id: id
              })
    }); 
    if (res.status == 201) { 
      this.setState({
        courses: {
          courses: newCourses
        }
      })
      return("New round updated.");
    } else { 
      const resText = await res.text();
      return("New Round could not be updated. " + resText);
    }
  }

  deleteCourse = async(deleteId) => {
    let newCourses = [...this.state.courses.courses];
    let courseName = newCourses[deleteId].courseName
    newCourses.splice(deleteId, 1)
    const url = "/courses";
    let res = await fetch(url, {
      method: 'DELETE',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'DELETE',
              body: JSON.stringify({
                index: deleteId,
                courseName: courseName
              })
    }); 
    if (res.status == 201) { 
      this.setState({
        courses: {
          courses: newCourses
        }
      })
      return("The round is deleted.");
    } else { 
      const resText = await res.text();
      return("The Round could not be deleted. " + resText);
    }
  }
  render() {
    return (
      <>
        <NavBar courses={this.state.courses.courses}
                mode={this.state.mode}
                setMode={this.setMode} 
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userData={this.state.userData}
                updateUserData={this.updateUserData}
                isDetailsView={this.state.isDetailsView}
                isEditDetailsView={this.state.isEditDetailsView}
                detailsCallBack={this.detailsCallBack}
                editDetailsCallBack={this.editDetailsCallBack}
                displayName={this.state.userData.identityData.displayName}/> 
        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}/> 
        {this.state.menuOpen  ? <SideMenu logOut={this.logOut}/> : null}
        {
          {LoginMode:
            <LoginPage modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       logInUser={this.logInUser}
                       createAccount={this.createAccount}
                       accountExists={this.accountExists}
                       authenticateUser={this.authenticateUser}/>, 
          FeedMode:
            <FeedPage modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}/>,
          RoundsMode:
            <RoundsPage rounds={this.state.userData.rounds}
                        addRound={this.addRound}
                        updateRound={this.updateRound}
                        deleteRound={this.deleteRound}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}
                        changeIsDetailsView={this.changeIsDetailsView}
                        changeIsEditDetailsView={this.changeIsEditDetailsView}
                        detailsBackFunction={callBack => {this.detailsBackFunction(callBack)}}
                        editDetailsBackFunction={callBack => this.editDetailsBackFunction(callBack)}/>,
          CoursesMode:
            <CoursesPage courses={this.state.courses.courses}
                        addCourse={this.addCourse}
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}
                        setCourses={this.setCourses}/>,
          BuddiesMode:
            <BuddiesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          ProfileSettingMode:
            <ProfileSettings modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userData={this.state.userData}
                        modeTemp={this.state.modeTemp}
                        setMode={this.setMode}
                        updateUserData={this.updateUserData}/>
        }[this.state.mode]
        }
      </>
    ); 
  }

}
export default App;