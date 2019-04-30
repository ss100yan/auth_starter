const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// grabs any env= value from th process argument vector
let environment = process.argv.filter(processArgument => {
  return processArgument.includes("env=");
});

// gets the value after the = sign from env=
environment = environment[0] ? environment[0].split("=")[1] : "";

// will look to specific .env files based on environment
function loadVarsByEnv() {
  // will load different environmental variable contexts
  switch (environment || process.env.NODE_ENV) {
    case "prod":
      console.log("loaded prod config from cloud config");
      break;
    case "stage":
      // load the default config
      dotenv.config();
      const currentPath = process.cwd();
      // over ride with any rules in stage env
      const stageVariables = dotenv.parse(
        fs.readFileSync(path.resolve(currentPath, "stage.env"))
      );
      for (const envVar in stageVariables) {
        if ({}.hasOwnProperty.call(stageVariables, envVar)) {
          process.env[envVar] = stageVariables[envVar];
        }
      }
      break;
    case "dev":
      console.log("\nloading dev configuration \n");
      dotenv.config();
      break;
    default:
      console.log("\nloading dev configuration since no env was passed \n");
      dotenv.config();
      break;
  }
}

module.exports = loadVarsByEnv;
