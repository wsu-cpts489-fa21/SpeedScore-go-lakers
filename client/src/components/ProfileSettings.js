import React from 'react';
import logo from '../images/sslogo2.png'

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: this.props.userData.accountData.password,
            securityQuestion: this.props.userData.accountData.securityQuestion,
            securityAnswer: this.props.userData.accountData.securityAnswer,
            displayName: this.props.userData.identityData.displayName
        };
        this.submitProfileChange = this.submitProfileChange.bind(this);
        this.closeProfileSettings = this.closeProfileSettings.bind(this);
    }
    submitProfileChange = () => {
        let newUserData = this.props.userData;
        newUserData.accountData.password = this.state.password;
        newUserData.accountData.securityQuestion = this.state.securityQuestion;
        newUserData.accountData.securityAnswer = this.state.securityAnswer;
        newUserData.identityData.displayName = this.state.displayName;
        this.props.updateUserData(newUserData);
        this.props.setMode(this.props.modeTemp);
    }
    closeProfileSettings = () => {
        this.props.setMode(this.props.modeTemp);
    }
    handleChange = (event) => {
        const name = event.target.name;
        if (name === "password") {
            const newPassword = event.target.value;
            this.setState({password: newPassword});
        } else if (name === "securityQuestion") {
            const newSecurityQuestion = event.target.value;
            this.setState({securityQuestion: newSecurityQuestion});
        } else if (name === "securityAnswer") {
            const newSecurityAnswer = event.target.value;
            this.setState({securityAnswer: newSecurityAnswer});
        } else if (name === "displayName") {
            const newDisplayName = event.target.value;
            this.setState({displayName: newDisplayName});
        }
    }
    render() {
        return (
            <div className="modal fade" id="profileModal" className="mode-page" role="tabpanel"
                 aria-label="Profile Modal" tabIndex="-1">
                <h1 className="mode-page-header">Account & Profile</h1>
                <div className="mb-3 centered">
                    <label className="form-label">UserId:      
                        {this.props.userData.accountData.id}
                    </label>
                </div>
                <div className="mb-3 centered">
                    <label className="form-label">Password:
                        <input id="password" name="password" 
                            className="form-control centered" type="text" 
                            size="50" maxLength="50"  value={this.state.password} 
                            onChange={this.handleChange} required />
                    </label>
                </div>
                <div className="mb-3 centered">
                    <label className="form-label">Security Question:
                        <input id="securityQuestion" name="securityQuestion" 
                            className="form-control centered" type="text" 
                            size="50" maxLength="50"  value={this.state.securityQuestion} 
                            onChange={this.handleChange} required />
                    </label>
                </div>
                <div className="mb-3 centered">
                    <label className="form-label">Security Answer:
                        <input id="securityAnswer" name="securityAnswer" 
                            className="form-control centered" type="text" 
                            size="50" maxLength="50"  value={this.state.securityAnswer} 
                            onChange={this.handleChange} required />
                    </label>
                </div>
                <div className="mb-3 centered">
                    <label className="form-label">Display Name:
                        <input id="displayName" name="displayName" 
                            className="form-control centered" type="text" 
                            size="50" maxLength="50"  value={this.state.displayName} 
                            onChange={this.handleChange} required />
                    </label>
                </div>
                <div className="modal-footer" style={{justifyContent: "center", alignItems: "center"}}>
                     <button type="button" className="btn btn-secondary" onClick={() => this.closeProfileSettings()}>Cancel</button>
                     <button type="button" className="btn btn-primary" onClick={() => this.submitProfileChange()}>Save</button>
                </div>
            </div>
        );
    }   
}

export default ProfileSettings;
