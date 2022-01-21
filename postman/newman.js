const newman = require("newman");

newman.run({
  collection: "postman/DesarrolloAlkemyChallenge.json",
  environment: "postman/Desarrollo.postman_environment.json",
  reporters: ["htmlextra"],
  iterationCount: 1,
  workingDir: "postman/",
  reporter: {
    htmlextra: {
      export: "./postman/report.html",
    },
  },
});
