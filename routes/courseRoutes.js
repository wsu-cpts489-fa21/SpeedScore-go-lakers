//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON COURSE DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import {Course} from "../models/Course.js";
import express from 'express';
import { ObjectId } from 'mongodb'   
const courseRoute = express.Router();

//CREATE course route: Adds a new course as a subdocument to 
//a document in the users collection (POST)
courseRoute.post('/courses', async (req, res, next) => {
    console.log("in /courses (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("courseName") || 
        !req.body.hasOwnProperty("address")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /rounds formulated incorrectly." +
        "Body must contain all 8 required fields: date, course, type, holes, strokes, " +
        "minutes, seconds, notes.");
    }
    try {
      const course = new Course(req.body);
      const error = course.validateSync();
      if (error) { //Schema validation error occurred
        return res.status(400).send("Round not added to database. " + error.message);
      }
      let thisCourse = await Course.findOne({"courseName": req.body.courseName});
      if (thisCourse) { //account already exists
          res.status(400).send("There is already an course with email '" + 
          req.body.courseName + "'.");
      } else { 
        thisCourse = await new Course({
          courseName: req.body.courseName,
          address: req.body.address,
          phone: req.body.phone,
          geolocation: req.body.geolocation,
          picture: req.body.picture,
          teeName: req.body.teeName,
          golfingYardage: req.body.golfingYardage,
          runningYardage: req.body.runningYardage,
          numberOfHoles: req.body.numberOfHoles,
          holebyHole: req.body.holebyHole,
          timePars: req.body.timePars,
          timeParConstant: req.body.timeParConstant,
          speedgolfRecord: req.body.speedgolfRecord
        }).save();
        return res.status(201).send("Course successfully added to database.");
      }
      // const status = await Course.updateOne(
      //   {$push: {courses: req.body}});
      // if (status.modifiedCount != 1) {
      //   console.log(321123)
      //   return res.status(400).send("Round not added to database. "+
      //     "User '" + req.params.userId + "' does not exist.");
      // } 
      // else {
      //   return res.status(201).send("Course successfully added to database.");
      // }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Course not added to database. " +
        "Unexpected error occurred: " + err);
    } 
  });

//READ round route: Returns all rounds associated with a given user in 
//the users collection (GET)
courseRoute.get('/courses', async(req, res) => {
    console.log("in /courses route (GET) get all courses");
    try {
      let allCourses = await Course.find();
      if (!allCourses) {
        return res.status(400).send("No course was found in database.");
      } else {
        // console.log(res.status(201).json(JSON.stringify(allCourses)))
        return res.status(201).json(JSON.stringify(allCourses));
      }
    } catch (err) {
      return res.status(400).send("Unexpected error occurred when looking " +
        "up user in database: " + err);
    }
});
  
//UPDATE round route: Updates a specific round for a given user
//in the users collection (PUT)
//TO DO: Implement this route
courseRoute.put('/courses', async (req, res, next) => {
  const index = req.body.editId;
  console.log("in /courses (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  if (!req.body.newCourseData.hasOwnProperty("courseName") || 
      !req.body.newCourseData.hasOwnProperty("address")) {
    //Body does not contain correct properties
    return res.status(400).send("PUT request on /rounds formulated incorrectly." +
      "Body must contain all 8 required fields: date, course, type, holes, strokes, " +
      "minutes, seconds, notes.");
  }
  try {
    const course = new Course(req.body.courses[index]);
    const error = course.validateSync();
    if (error) { //Schema validation error occurred
      return res.status(400).send("Course not updated to database. " + error.message);
    }
    const status = await Course.updateOne(
      {$set: {
        courseName: req.body.newCourseData.courseName,
        address: req.body.newCourseData.address,
        phone: req.body.newCourseData.phone,
        geolocation: req.body.newCourseData.geolocation,
        picture: req.body.newCourseData.picture,
        teeName: req.body.newCourseData.teeName,
        golfingYardage: req.body.newCourseData.golfingYardage,
        runningYardage: req.body.newCourseData.runningYardage,
        numberOfHoles: req.body.newCourseData.numberOfHoles,
        holebyHole: req.body.newCourseData.holebyHole,
        timePars: req.body.newCourseData.timePars,
        timeParConstant: req.body.newCourseData.timeParConstant,
        speedgolfRecord: req.body.newCourseData.speedgolfRecord
      }});
    if (status.modifiedCount != 1) {
      return res.status(400).send("Course not updated to database.");
    } else {
      return res.status(201).send("Course successfully updated to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Round not updated to database. " +
      "Unexpected error occurred: " + err);
  } 
});

//DELETE round route: Deletes a specific round for a given user
//in the users collection (DELETE)
//TO DO: Implement this route
courseRoute.delete('/courses', async (req, res, next) => {
  console.log("in /rounds (DELETE) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body.index));
  try {
    let allCourses = await Course.find();
    allCourses.splice(req.body.index,1)
    const status = await Course.deleteOne({"courseName": req.body.courseName})
    if (status.deletedCount != 1) {
      return res.status(400).send("Course not deleted to database.");
    } else {
      return res.status(201).send("Course successfully deleted to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course not deleted to database. " +
      "Unexpected error occurred: " + err);
  } 
});

export default courseRoute;