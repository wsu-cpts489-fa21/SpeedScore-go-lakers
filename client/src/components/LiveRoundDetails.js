import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import RoundsMode  from './RoundsMode.js';
import EditLiveRound from './EditLiveRound.js';


class LiveRoundDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editId: -1,
            editLiveRound: false
        };
        this.props.detailsBackFunction(() => this.props.setMode(RoundsMode.ROUNDSTABLE));
        this.props.editDetailsBackFunction(this.backToDetails);
    }

    formatDate = (milliseconds) =>{
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.ceil(milliseconds / 1000) % 60;
        return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds)
    }

    initiateEditDetailedRound = (val) => {
        this.setState({
            editId: val,
            editLiveRound: true
        }, () => {
            this.props.changeIsEditDetailsView()
            this.props.toggleModalOpen()
        })
    }

    backToDetails = () => {
        this.setState({editLiveRound: false})
    }

    componentWillUnmount(){
        this.props.changeIsDetailsView()
    }

    updateChanges = async(holeData) =>{
        let roundData = this.props.roundData
        roundData.details.splice(this.state.editId,1,holeData)
        const milliSeconds = roundData.details.reduce((total, detail) => {
            return total + detail.time;
        },0)
        const strokes = roundData.details.reduce((total, detail) => {
            return total + detail.stroke;
        },0)
        const seconds = Math.floor(milliSeconds / 1000) % 60;
        const minutes = Math.floor(milliSeconds / 60000);
        const SGS = (strokes + minutes) + ":" + seconds;
        const newRound = {
            date: roundData.date, 
            course: "LiveLogRounds",
            type: "practice",
            holes: "18",
            minutes: minutes < 1 ? 1 : minutes,
            seconds: seconds + "",
            SGS,
            notes: "",
            strokes,
            details: roundData.details
        };
        const res = await this.props.saveRound(newRound,this.props.editId);
    }

    render() {
        const table = [];
        for (let r = 0; r < this.props.roundData.details.length; ++r) {
            table.push(
              <tr key={r}>
                <th scope="row">{r+1}</th>
                <td>{this.props.roundData.details[r].par}</td>
                <td>{this.props.roundData.details[r].stroke}</td>
                <td>{this.formatDate(this.props.roundData.details[r].time)}</td>
                <td>
                  <button id={'editDetailsBtn' + r} type="button" className="btn btn-outline-secondary" onClick= { () => this.initiateEditDetailedRound(r)}>Edit</button>
                </td>
              </tr> 
            );
          }
        return (
            this.state.editLiveRound ?
            <EditLiveRound 
                mode={this.props.mode}
                editId = {this.state.editId}
                holeData={this.props.roundData.details[this.state.editId]}
                saveRound={this.props.saveRound}
                toggleModalOpen={this.props.toggleModalOpen}
                backToDetails={this.backToDetails}
                formatDate={this.formatDate} 
                changeIsEditDetailsView={this.props.changeIsEditDetailsView}
                updateChanges={this.updateChanges}/> :
            <div id="live-round-form"
                className="mode-page action-dialog" role="dialog" 
                aria-modal="true" aria-labelledby="roundFormHeader" tabIndex="0">
                <table className="table table-striped live-round-table">
                    <thead>
                        <tr>
                            <th scope="col">Hole</th>
                            <th scope="col">Par</th>
                            <th scope="col">Strokes</th>
                            <th scope="col">Times</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
          </div>
          
      );
    }
  
}

export default LiveRoundDetails;