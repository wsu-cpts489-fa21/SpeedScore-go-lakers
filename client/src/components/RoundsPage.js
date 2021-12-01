import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import PopUpModal from './PopUpModal.js'
import LiveRoundForm from './LiveRoundForm.js';

class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          deleteId: -1,
                          editId: -1,
                          showPopUpModal: false,
                          showPopUpModalForRoundMethod:false};       
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    initiateEditRound = (val) => {
        this.setState({editId: val,
                       mode: RoundsMode.EDITROUND}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteRound = (val) => {
        this.setState({deleteId: val,
                    showPopUpModal :true   })
    }

    render() {
        const choices = {
            Confirm: () => {
                this.props.deleteRound(this.state.deleteId);
                this.setState({showPopUpModal : false})
            },
            Cancel: () => {this.setState({showPopUpModal : false})}
          }
        const choicesForRoundMethod = {
            "Track Live": () => {
                this.setState({showPopUpModalForRoundMethod : false, mode: RoundsMode.LOGLIVEROUND},this.props.toggleModalOpen)
            },
            "Log Previously Played": () => {
                this.setState({showPopUpModalForRoundMethod : false, mode: RoundsMode.LOGROUND},this.props.toggleModalOpen)
            },
            Cancel: () => {this.setState({showPopUpModalForRoundMethod : false})}
          }
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    <RoundsTable rounds={this.props.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteRound={this.props.deleteRound} 
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                updateRound= {this.props.updateRound}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon="calendar"
                        label={"Log Round"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({showPopUpModalForRoundMethod: true})} />
                    {this.state.showPopUpModal && <PopUpModal text="Are you sure to delete?" choices={choices}/>}
                    {this.state.showPopUpModalForRoundMethod && <PopUpModal text="Please choose a log method:" choices={choicesForRoundMethod}/>}
            </>
            );
        case RoundsMode.LOGROUND:
            return (
            <RoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.LOGLIVEROUND:
            return (
            <LiveRoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            return (
            <RoundForm mode={this.state.mode}
                editId = {this.state.editId}
                roundData={this.props.rounds[this.state.editId]}
                saveRound={this.props.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;