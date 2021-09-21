const newman = require('newman');

newman.run({
  collection:"postman/UsersTest.postman_collection.json",
  environment:"postman/Local.postman_environment.json",
  reporters:["htmlextra"],
  iterationCount: 2,
  reporter:{
    htmlextra:{
      export:"./postman/report.html",
    }
  }
});
