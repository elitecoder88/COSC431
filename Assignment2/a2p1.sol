// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CSEnrollment {
  address public owner;

  enum EnrollmentType { UNDERGRADUATE, GRADUATE }

  struct Course {
    uint256 number;
    EnrollmentType courseType;
    bool gradsCanEnroll;
    bool exists;
    Student[] registeredStudents;
  }

  struct Registered {
    address id;
    uint256 courseNum;
    uint256 timestamp;
    uint256 credits;
    bool exists;
  }

  struct Student {
    address id;
    uint256 credits;
    bool exists;
  }

  // Define State vars here

  mapping(uint => Course) public courses;
  mapping(address => Student) public students;
  

  constructor() {
    console.log("Welcome to Towson Computer Science");

    owner = msg.sender;
    add(431, EnrollmentType.UNDERGRADUATE);
    add(484, EnrollmentType.UNDERGRADUATE);
    add(617, EnrollmentType.GRADUATE);
    add(670, EnrollmentType.GRADUATE);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this operation.");
    _;
  }

  modifier courseExists(uint courseNumber) {
    require(courses[courseNumber].exists == true, "Course does not exist.");
    _;
  }

  modifier canRegister(uint courseNumber, EnrollmentType studentType, uint credits) {
    // Check if there is less than 30 students in the course
    require(courses[courseNumber].number < 30, "Cannot register, course is full.");
    
    // Check if students is already registered
    require(students[msg.sender].exists == false, "You are already registered in a course. Students can only register once.");

    if (studentType == EnrollmentType.UNDERGRADUATE) {
      // Can only register for UNDERGRADUATE course
      require(courses[courseNumber].courseType == EnrollmentType.UNDERGRADUATE, "UNDERGRAD students can only register for UNDERGRADUATE courses.");

    } else if (studentType == EnrollmentType.GRADUATE && credits < 20) {
      // Can only register for GRADUATE course
      // Added the gradsCanEnroll bool verification since it needs to be true for grad with less than 20 credits
      // All UNDERGRADUATE courses have gradsCanEnroll == false since these are courses for UNDERGRADUATE only
      require(courses[courseNumber].courseType == EnrollmentType.GRADUATE && courses[courseNumber].gradsCanEnroll == true, "GRADUATE students can only register for GRADUATE courses.");
    } else {
      // Can register in any course except 431
      // No need to add the gradsCanEnroll verification since grads with more than 20 credits can enroll in any courses
      // Wether it is an UNDERGRADUATE course or a GRADUATE course as lond as it it not 431
      require(courseNumber != 431, "GRADUATE students with more than 20 credits can register in any course except 431.");
    }
    _;
  }

  function register(uint credits, EnrollmentType studentType, uint course) public courseExists(course) canRegister(course, studentType, credits) {
    // Create a Student instance with the student registering information
    students[msg.sender] = Student(msg.sender, credits, true);
    // Update the number of students registered in a course by adding ++
    courses[course].number++;
    courses[course].registeredStudents.push(students[msg.sender]);
  }

  function add(uint courseNumber, EnrollmentType courseType) public onlyOwner {
    // Add a require that allows only UNDERGRADUATE or GRADUATE courseType
    require(courses[courseNumber].courseType == EnrollmentType.UNDERGRADUATE || courses[courseNumber].courseType == EnrollmentType.GRADUATE, "Course must be of type UNDERGRADUATE or GRADUATE to be added in course list.");

    // Check if course already exists
    require(courses[courseNumber].exists == false, "Course already exsists.");

    // If the courseType of new course is UNDERGRADUATE, the gradsCanEnroll attribute in the Course struct is false
    // Else if courseType is GRADUATE, the gradsCanEnroll attribute in the Course struct is true
    if (courseType == EnrollmentType.UNDERGRADUATE) {
      courses[courseNumber].number = 0;
      courses[courseNumber].courseType = courseType;
      courses[courseNumber].gradsCanEnroll = false;
      courses[courseNumber].exists = true;
    } else {
      courses[courseNumber].number = 0;
      courses[courseNumber].courseType = courseType;
      courses[courseNumber].gradsCanEnroll = true;
      courses[courseNumber].exists = true;
    }
  }

  function getRoster(uint course) public courseExists(course) view {
    Student[] memory roster = courses[course].registeredStudents;

    if (roster.length > 0) {
      console.log("There is %s student(s) registered in course %s.", roster.length, course);
      console.log("Address of registered student(s) in course %s: ", course);
      for (uint i = 0; i < roster.length; i++) {
        console.log(roster[i].id);
      }
    } else {
      console.log("Course %s exist but there is 0 student registered.", course);
    }
  }
}