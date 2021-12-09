import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    // _id: {type: String, required: true},
    courseName: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: false},
    geolocation: {type: String, required: false},
    picture : {type: String, required: false},
    teeName : {type: String, required: false},
    golfingYardage : {type: String, required: false},
    runningYardage : {type: String, required: false},
    numberOfHoles : {type: String, required: false},
    holebyHole : {type: String, required: false},
    timePars : {type: String, required: false},
    timeParConstant : {type: Number, required: false},
    speedgolfRecord : {type: String, required: false}
  });

  // CourseSchema.virtual('SGS').get(function() {
  //   return (this.strokes * 60) + (this.minutes * 60) + this.seconds;
  // });
  

const Course = mongoose.model("Course", CourseSchema);
export {CourseSchema, Course};