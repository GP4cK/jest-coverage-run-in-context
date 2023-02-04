const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const fs = require('fs');
const vm = require("vm");
const path = require("path");

class CustomEnv extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.loadContext();
  }

  loadContext() {
    const js = fs.readFileSync('./src/index.js', 'utf8');
    const context = vm.createContext(this.global);
    vm.runInContext(js, context, {
      filename: path.resolve('./src/index.js'),
      displayErrors: true,
    });
    Object.assign(this.global, context);
  }
}

module.exports = CustomEnv;