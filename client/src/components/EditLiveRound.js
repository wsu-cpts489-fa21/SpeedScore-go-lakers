import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


class EditLiveRound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stroke: this.props.holeData.stroke || 5,
            time: this.props.holeData.time || 0
        };
    }

    addStrokes = () => {
        this.setState({stroke: ++this.state.stroke})
    }

    subtractStrokes = () => {
        this.setState({stroke: --this.state.stroke})
    }

    addTime = () =>{
        this.setState({time: this.state.time + 1000})
    }

    subtractTime = () =>{
        this.setState({time: this.state.time - 1000})
    }

    saveChanges = () =>{
        this.props.updateChanges({
            stroke: this.state.stroke,
            par: this.state.stroke,
            time: this.state.time
        },this.props.backToDetails())
    }

    cancelChanges = () =>{
        this.props.backToDetails();
    }

    componentWillUnmount(){
        this.props.changeIsEditDetailsView()
    }


    render() {
        return (
            <div id="live-round-form"
                className="mode-page action-dialog" role="dialog" 
                aria-modal="true" aria-labelledby="roundFormHeader" tabIndex="0">
              <div id="live-round-form-top">
                    <div id="edit_hole"><h2>{"Hole #" + (this.props.editId + 1)}</h2></div><br/>
                    <h4>(Par {this.state.stroke})</h4>
              </div>
              <div id="live-round-form-center">
                    <u>Edit Strokes:</u>
                    <button type="button" id="Plus" className={ this.state.stroke <= 199 ? "btn btn-dark" : "btn btn-opacity btn-dark disabled"} onClick={this.addStrokes}>+</button>
                    <span>{this.state.stroke + " (Par)"}</span>
                    <button type="button" id="Minus" className={this.state.stroke >= 2 ? "btn btn-dark" : "btn btn-opacity btn-dark disabled"} onClick={this.subtractStrokes}>-</button>
                    <u>Edit Time:</u>
                    <button type="button" className="btn btn-white" onClick={this.addTime}>+</button>
                    <span>{this.props.formatDate(this.state.time)}</span>
                    <button type="button" className={this.state.time >= 1000 ? "btn btn-white" : "btn btn-opacity btn-white disabled"} onClick={this.subtractTime}>-</button>
              </div>
              <div id="live-round-form-bottom">
                <button type="button" id="Save"  className="btn btn-success" onClick={this.saveChanges}>
                     Save Changes
                </button>
                <button type="button" id="Cancel" className="btn btn-danger" onClick={this.cancelChanges}>
                     Cancel Changes
                </button>
              </div>
          </div>
        );
    }
  
}

export default EditLiveRound;