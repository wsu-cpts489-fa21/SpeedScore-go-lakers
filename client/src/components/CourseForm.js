import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CoursesMode  from './CoursesMode.js';
import Geocode from "react-geocode";
/* global google */

const GoogleMapsAPI = "AIzaSyB7EU3V1YeIOUtj8lrw-WVnyRTdRDerNvY"
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class CourseForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.mode === CoursesMode.ADDCOURSE) {
            this.state = {
                            courseName: "",
                            address: "",
                            phone: "",
                            geolocation: "",
                            picture: "",
                            teeName: "",
                            golfingYardage: "",
                            runningYardage: 10,
                            numberOfHoles: "",
                            holebyHole: "",
                            timePars: 700,
                            timeParConstant: 70,
                            speedgolfRecord: "",
                            btnIcon: "calendar",
                            btnLabel: "Add Course",
                            // mapPosition: {
                            //   lat: 46.7566592,
                            //   lng: -117.1849216
                            // }
                      };
        } else { 
            this.state = this.props.courseData;
            this.state.btnIcon = "edit";
            this.state.btnLabel = "Update Course";
            // this.state.mapPosition = {
            //   lat: 46.7566592,
            //   lng: -117.1849216
            // }
        }
        // this.geo_success = this.geo_success.bind(this)
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }
    handleChange = (event) => {
        const name = event.target.name;
        // this.setState({[name]: event.target.value});
        if (name === "runningYardage") {
          const newRunningYardage = event.target.value
          const newTimePars = newRunningYardage * this.state.timeParConstant;
          this.setState({runningYardage: newRunningYardage, timePars: newTimePars});
        } else if (name === "timeParConstant") {
            const newTimeParConstant = event.target.value;
            const newTimePars = newTimeParConstant * this.state.runningYardage;
            this.setState({timeParConstant: newTimeParConstant, timePars: newTimePars});
        } else {
          this.setState({[name]: event.target.value});
        }
    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({btnIcon: "spinner", btnLabel: "Saving..."},this.handleSubmitCallback);
    }

    handleSubmitCallback = async() => {
        const newCourse = {...this.state};
        delete newCourse.btnIcon;
        delete newCourse.btnLabel;
        const res = await this.props.saveCourse(newCourse, this.props.editId);
        this.props.toggleModalOpen();
        this.props.setMode(CoursesMode.COURSESTABLE);
    }
  
    // geo_success(pos) {
    //   var crd = pos.coords;
    //   this.setState({
    //     mapPosition: {
    //       lat: crd.latitude,
    //       lng: crd.longitude
    //     }
    //   })
    //   console.log(this.state.mapPosition.lat)
    //   console.log(this.state.mapPosition.lng)
    //   console.log('Your current position is:');
    //   console.log('Latitude : ' + crd.latitude);
    //   console.log('Longitude: ' + crd.longitude);
    //   console.log('More or less ' + crd.accuracy + ' meters.');
    // }
    
    // geo_error() {
    //   alert("Sorry, no position available.");
    // }
    
    componentDidMount() {
      this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

      this.autocomplete.addListener('place_changed', this.handlePlaceChanged);



      // let geo_options = {
      //   enableHighAccuracy: true,
      //   maximumAge        : 30000,
      //   timeout           : 27000
      // };
      // navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error, geo_options);
      // console.log(this.state.mapPosition.lat)
      // console.log(this.state.mapPosition.lng)
      // Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
      //  response => {
      //   const address = response.results[0].formatted_address;
      
      //   this.setState( {
      //    address: ( address ) ? address : ''
      //   } )
      //  },
      //  error => {
      //   console.error(error);
      //  }
      // );
    };
    handlePlaceChanged(){
      const place = this.autocomplete.getPlace();
      console.log(place)
      this.setState({
        courseName: place.name,
        address: place.formatted_address,
        geolocation: place.geometry.viewport.zb.g + ", " +place.geometry.viewport.Qa.g
      })
    }
    // onPlaceSelected = ( place ) => {
    //   console.log( 'plc', place );
    //   const address = place.formatted_address,
    //         latValue = place.geometry.location.lat(),
    //         lngValue = place.geometry.location.lng();
    //   // Set these values in the state.
    //   this.setState({
    //     address: ( address ) ? address : '',
    //     mapPosition: {
    //       lat: latValue,
    //       lng: lngValue
    //     },
    //   })
    // };
    render() {
      return (
        
              <div id="CoursesModeDialog" 
                className="mode-page action-dialog" role="dialog" 
                aria-modal="true" aria-labelledby="CourseFormHeader" tabIndex="0">
                  
            <h1 id="CourseFormHeader" className="mode-page-header">
                {this.props.mode==CoursesMode.ADDCOURSE ? "Add Course" : "Edit Course"}
            </h1>
            <form id="logCourseForm" 
                  onSubmit={this.handleSubmit} noValidate>

                <div className="mb-3 centered">
                  <label htmlFor="courseName" className="form-label">Course Name:
                      <input ref={this.autocompleteInput}  
                          id="autocomplete" placeholder="Enter the course name"
                          name="courseName" 
                          className="form-control centered" type="text" 
                          aria-describedby="courseDescr"
                          value={this.state.courseName} style={{width: "447px"}}
                          onChange={this.handleChange} />
                  </label>
                  <div id="courseDescr" className="form-text">
                    Enter an course name of at most 50 characters
                  </div>
                </div>

                <div className="mb-3 centered">
                <label htmlFor="address" className="form-label">Address:
                    <input id="address" name="address" 
                        className="form-control centered" type="text" 
                        aria-describedby="addressDescr"
                        size="50" maxLength="50"  value={this.state.address} 
                        onChange={this.handleChange} required />
                </label>
                <div id="addressDescr" className="form-text">
                Enter an address of at most 50 characters
                </div>
              </div>
              {/* <Autocomplete
                  apiKey={GoogleMapsAPI}
                  style={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '16px',
                    marginTop: '2px'
                  }}
                  onPlaceSelected={(place, inputRef, autocomplete) => {
                    console.log(autocomplete);
                  }}
                /> */}

              {/* <div className="mb-3 centered">
                <label htmlFor="courseName" className="form-label">Course Name:
                    <input id="courseName" name="courseName" 
                        className="form-control centered" type="text" 
                        aria-describedby="courseNameDescr"
                        size="50" maxLength="50"  value={this.state.courseName} 
                        onChange={this.handleChange} required />
                </label>
                <div id="courseNameDescr" className="form-text">
                Enter a course name of at most 50 characters
                </div>
              </div> */}
              
              

              <div className="mb-3 centered">
                <label htmlFor="phone" className="form-label">Phone number:
                    <input id="phone" name="phone" 
                        className="form-control centered" type="text" 
                        aria-describedby="phoneDescr"
                        size="50" maxLength="50"  value={this.state.phone} 
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="geolocation" className="form-label">Geolocation:
                    <input id="geolocation" name="geolocation" 
                        className="form-control centered" type="text" 
                        aria-describedby="geolocationDescr"
                        size="50" maxLength="50"  value={this.state.geolocation} 
                        onChange={this.handleChange} />
                </label>
                <div id="geolocationDescr" className="form-text">
                Enter a geolocation of at most 50 characters
                </div>
              </div>

              {/* <div className="mb-3 centered">
                <label htmlFor="picture" className="form-label">Picture:
                    <input id="picture" name="picture" 
                        className="form-control centered" type="text" 
                        aria-describedby="pictureDescr" 
                        value={this.state.picture}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div> */}

              <div className="mb-3 centered">
                <label htmlFor="profilePic" className="form-label">
                  Course Picture:<br/>
                  {/* <img id="coursePicImage" 
                      src={this.state.picture} 
                      className="form-control centered" height="46" width="auto"/> */}
                  <input id="picture"
                      onChange={this.handleChange}
                      className="form-control centered"
                      name="coursePic"
                      type="file"
                      accept=".png, .gif, .jpg"
                      aria-describedby="coursePicDescr"
                  />
                </label>
                <div id="coursePicDescr" className="form-text">
                  A profile picture that represents you in the app (defaults to a generic picture)
                </div>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="teeName" className="form-label">Tee Name:
                    <input id="teeName" name="teeName" 
                        className="form-control centered" type="text" 
                        aria-describedby="teeNameDescr" 
                        value={this.state.teeName}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="golfingYardage" className="form-label">Golfing Yardage:
                    <input id="golfingYardage" name="golfingYardage" 
                        className="form-control centered" type="text" 
                        aria-describedby="golfingYardageDescr" 
                        value={this.state.golfingYardage}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="runningYardage" className="form-label">Running Yardage:
                    <input id="runningYardage" name="runningYardage" 
                        className="form-control centered" type="text" 
                        aria-describedby="runningYardageDescr" 
                        value={this.state.runningYardage}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="numberOfHoles" className="form-label">Number Of Holes:
                    <input id="numberOfHoles" name="numberOfHoles" 
                        className="form-control centered" type="text" 
                        aria-describedby="numberOfHolesDescr" 
                        value={this.state.numberOfHoles}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="holebyHole" className="form-label">Hole by Hole:
                    <input id="holebyHole" name="holebyHole" 
                        className="form-control centered" type="text" 
                        aria-describedby="holebyHoleDescr" 
                        value={this.state.holebyHole}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="timePars" className="form-label">Time Pars:
                    <input id="timePars" name="timePars" 
                        className="form-control centered" type="text" 
                        aria-describedby="timeParsDescr" 
                        value={this.state.timePars}  style={{width: "447px"}}
                        readOnly={true} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="timeParConstant" className="form-label">Time Par Constant:
                    <input id="timeParConstant" name="timeParConstant" 
                        className="form-control centered" type="text" 
                        aria-describedby="timeParConstantDescr" 
                        value={this.state.timeParConstant}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mb-3 centered">
                <label htmlFor="speedgolfRecord" className="form-label">Speedgolf Records:
                    <input id="speedgolfRecord" name="speedgolfRecord" 
                        className="form-control centered" type="text" 
                        aria-describedby="speedgolfRecordDescr" 
                        value={this.state.speedgolfRecord}  style={{width: "447px"}}
                        onChange={this.handleChange} />
                </label>
              </div>

              <div className="mode-page-btn-container">
                <button id="submit" type="submit" className="mode-page-btn action-dialog action-button">
                    <FontAwesomeIcon icon={this.state.btnIcon}  className={this.state.btnIcon == "spinner" ? "fa-spin" : ""}/>
                    <span>&nbsp;{this.state.btnLabel}</span>
                </button>
                <button type="button" 
                        className="mode-page-btn-cancel action-dialog cancel-button"
                        onClick={() => {this.props.setMode(CoursesMode.COURSESTABLE);
                                        this.props.toggleModalOpen();}}>
                  <FontAwesomeIcon icon="window-close"/>
                  <span>&nbsp;Cancel</span>
                </button>
            </div>
          </form>
        </div>
      );
    }
}

export default CourseForm;