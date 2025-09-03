// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CareerFair {
  address public owner;

  struct Company {
    bool exists;
  }

  struct Student {
    address id;
    bool exists;
  }

  // Define State vars here

  mapping(string => Company) public companies;
  mapping(address => Student) public students;

  Student[] enrolledStudents;

  constructor() {
    console.log("Welcome to Towson University Career Fair!");

    owner = msg.sender;

    add("Amazon");
    add("Google");
    add("Apple");
    add("Microsoft");
    add("Meta");
    add("Gemini");
    add("SecureEd");
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this operation.");
    _;
  }

  function enroll() public {
    // Check if student is not enrolled
    require(students[msg.sender].exists == false, "You are already enrolled in the Career Fair.");

    // Create a Student instance with the student enrollment information
    students[msg.sender] = Student(msg.sender, true);

    // Update the number of students enrolled in the Career Fair
    enrolledStudents.push(students[msg.sender]);
  }

  function unenroll() public {
    // Check if student is already enrolled
    require(students[msg.sender].exists == true, "You are not enrolled in the Career Fair.");

    // Find index of the Student to unenroll in our enrolledStudents array
    uint indexToRemove;
    for (uint i = 0; i < enrolledStudents.length; i++) {
      if (enrolledStudents[i].id == msg.sender) {
        indexToRemove = i;
        break;
      }
    }

    // Ensure the students was found
    require(indexToRemove < enrolledStudents.length, "Student not found in the enrolled students list");

    // Remove the student from the array
    // Check if the student is at the last index of the enrolledStudents array
    if (indexToRemove < enrolledStudents.length - 1) {
      // Move the last element to the position of the element to delete
      enrolledStudents[indexToRemove] = enrolledStudents[enrolledStudents.length - 1];
    }

    // Trim the array by poping the last element (studets to enenroll)
    enrolledStudents.pop();

    // Delete the Student information from the mapping
    delete students[msg.sender];
  }

  function add(string memory companyName) public onlyOwner {

    // Check if company already exists
    require(companies[companyName].exists == false, "Company already exists. Cannot add a company that already exists in the Career Fair.");

    companies[companyName].exists = true;
  }

  function getAttendees() public view returns (address[] memory) {
    address[] memory attendees = new address[](enrolledStudents.length);

    if (attendees.length > 0) {
      console.log("There is %s student(s) enrolled in the Career Fair.", attendees.length);
      for (uint i = 0; i < enrolledStudents.length; i++) {
        attendees[i] = enrolledStudents[i].id;
      }
    } else {
      console.log("Career Faire is there, but there is 0 student enrolled in the event.");
    }

    return attendees;
  }
}