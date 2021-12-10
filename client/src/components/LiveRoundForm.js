import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import RoundsMode  from './RoundsMode.js';


class LiveRoundForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inProcess: false,
            startTime: "",
            startDate: null,
            scoreLevel: false,
            timeInterval: 0,
            inHole: false,
            holeOutTime:0,
            strokes: 0,
            stroke: 5,
            holeNum: 1,
            totalMilliseconds: 0,
            details: []};
    }

    primaryBtnFunc = () => {
        if(this.state.scoreLevel){
            this.changeToInHole()
        }else{
            this.startRoundTimer()
        }
    }

    changeToInHole = () => {
        this.setState({
            inHole: true,
            holeOutTime: this.state.timeInterval
        })
    }

    startRoundTimer = () => {
        const startDate = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000)
        const startTime = startDate.toISOString().substr(11,8);
        if(!this.state.inProcess){
            this.setState({
                inProcess: true,
                startTime,
                startDate
            })
        }else{
            this.setState({
                startTime,
                startDate
            })
        }
    }

    updateTimeInterval() {
        if(this.state.scoreLevel){
            const timeInterval = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000) - this.state.startDate
            this.setState({timeInterval: timeInterval})
        }
      }

    componentDidMount() {
        this.timer = setInterval(
          () => this.updateTimeInterval(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    secondaryBtnFunc = () => {
        if(this.state.inHole){
            this.saveHole()
        }else{
            this.changeToScoreLevel()
        }
    }

    saveHole(){
        let details = this.state.details
        details.push({
            stroke: this.state.stroke,
            par: this.state.stroke,
            time: this.state.holeOutTime
        })
        if(this.state.holeNum === 18){
            this.setState({
                totalMilliseconds: this.state.totalMilliseconds + this.state.holeOutTime,
                strokes: this.state.strokes + this.state.stroke,
                details
            }, this.handleSubmit)
        }else{
            this.setState({
                totalMilliseconds: this.state.totalMilliseconds + this.state.holeOutTime,
                strokes: this.state.strokes + this.state.stroke,
                inHole: false,
                holeNum: ++this.state.holeNum,
                stroke: 5,
                details
            }, this.startRoundTimer)
        }
    }

    handleSubmit = async() => {
        const minutes = Math.floor(this.state.totalMilliseconds / 60000);
        const seconds = Math.floor(this.state.totalMilliseconds / 1000) % 60;
        const SGS = (this.state.strokes + minutes) + ":" + seconds;
        const newRound = {
            date: this.state.startDate.toISOString().substr(0,10), 
            course: "LiveLogRounds",
            type: "practice",
            holes: "18",
            minutes: minutes < 1 ? 1 : minutes,
            seconds: seconds + "",
            SGS,
            notes: "",
            strokes: this.state.strokes,
            details: this.state.details
        };
        const res = await this.props.saveRound(newRound);
        this.props.toggleModalOpen();
        this.props.setMode(RoundsMode.ROUNDSTABLE);
    }

    changeToScoreLevel = () => {
        this.setState({scoreLevel: true}, this.updateTimeInterval)
    }

    formatDate = (milliseconds) =>{
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.ceil(milliseconds / 1000) % 60;
        return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds)
    }

    addStrokes = () => {
        this.setState({stroke: ++this.state.stroke})
    }

    subtractStrokes = () => {
        this.setState({stroke: --this.state.stroke})
    }
    
    render() {
        return (
          <div id="live-round-form"
                className="mode-page action-dialog" role="dialog" 
                aria-modal="true" aria-labelledby="roundFormHeader" tabIndex="0">
            <h1 id="roundFormHeader" className="mode-page-header">
                Log Round
            </h1>
              <div id="live-round-form-top">
                  {this.state.scoreLevel ? 
                  <React.Fragment>
                    <div id="hole"><h2>{"Hole " + this.state.holeNum}</h2></div><br/>
                    <h3>Record Hole-Out Time</h3>
                  </React.Fragment>:
                  <React.Fragment>
                        18 Open Division<br/>
                        Tee time: 8:22<br/>
                        Playing holes 1 through 18
                  </React.Fragment>}
                <button type="button" id="Start" className={this.state.inHole ? "btn btn-deepblue" : "btn btn-dark"} onClick={this.primaryBtnFunc}>
                    <span>{this.state.inProcess ? (this.state.scoreLevel ? (this.state.inHole ? this.formatDate(this.state.holeOutTime) : this.formatDate(this.state.timeInterval)) : "Start Time: " + this.state.startTime) : "Start Round Timer"}</span>
                    <span>{this.state.inProcess ? (this.state.scoreLevel ? (this.state.inHole ? "Click to update" : "Click When in Hole") : "Click again to update") : "(No time recorded yet)"}</span>
                </button>
              </div>
              {this.state.inProcess && this.state.scoreLevel && <div id="live-round-form-center">
                  Record Strokes:
                <button type="button" className={this.state.inHole && this.state.stroke <= 199 ? "btn btn-dark" : "btn btn-opacity btn-dark disabled"} onClick={this.addStrokes}>+</button>
                <span>{this.state.stroke + " (Par)"}</span>
                <button type="button" className={this.state.inHole && this.state.stroke >= 2 ? "btn btn-dark" : "btn btn-opacity btn-dark disabled"} onClick={this.subtractStrokes}>-</button>
              </div>}
              <div id="live-round-form-bottom">
                <button type="button" id='GotoScoring' className={this.state.inProcess ? ((this.state.inHole || !this.state.scoreLevel) ? "btn btn-success" : "btn btn-success btn-opacity disabled") : "btn disabled"} onClick={this.secondaryBtnFunc}>
                    {this.state.scoreLevel ? "Save & Next Hole" : "Go to Scoring"}&nbsp;
                    <FontAwesomeIcon icon={["fas", "chevron-right"]} ></FontAwesomeIcon>
                </button>
              </div>
          </div>
      );
    }
  
}

export default LiveRoundForm;