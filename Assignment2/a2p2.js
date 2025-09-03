const hre = require("hardhat");

const main = async () => {
  const [owner, randomStudent1, randomStudent2, randomStudent3, randomStudent4] = await hre.ethers.getSigners();
  const CSEnrollmentContractFactory = await hre.ethers.getContractFactory("CSEnrollment");
  const CSEnrollmentContract = await CSEnrollmentContractFactory.deploy();
  const contractAddress = await CSEnrollmentContract.getAddress();
  
  console.log("Contract deployed to:", contractAddress);
  console.log("Contract deployed by:", owner.address);

  // student1 registering for a course (successful)
  let student1;
  student1 = await CSEnrollmentContract.connect(randomStudent1).register(10, 0, 431);

  // get roster after successful registration
  let roster1;
  roster1 = await CSEnrollmentContract.getRoster(431);

  // student2 registering for a course (unseccessfull) => student2 is trying to register in a GRADUATE course as an UNDERGRADUATE.
  let student2;
  student2 = await CSEnrollmentContract.connect(randomStudent2).register(10, 0, 670);

  // owner adding a course (successful)
  let theOwner;
  theOwner = await CSEnrollmentContract.connect(owner).add(612, 1);

  // get roster of new added course
  let roster2;
  roster2 = await CSEnrollmentContract.getRoster(612)
  
  // owner adding a course (unsuccessful) => course 670 already exist
  theOwner = await CSEnrollmentContract.connect(owner).add(670, 1);

  // get roster for existing course with 0 students
  let roster3;
  roster3 = await CSEnrollmentContract.getRoster(484);

  // student3 registering for course 617 
  let student3;
  student3 = await CSEnrollmentContract.connect(randomStudent3).register(37, 1, 617);

  // student4 registering for course 617
  let student4;
  student4 = await CSEnrollmentContract.connect(randomStudent4).register(22, 1, 617);

  // get roster for existing course with more than 0 students
  let roster4;
  roster4 = await CSEnrollmentContract.getRoster(617);

  // get roster for course that does not exist
  let roster5;
  roster5 = await CSEnrollmentContract.getRoster(455);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();