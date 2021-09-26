const os = require('os');
const path = require('path');

module.exports = {
  templatePath: path.join(__dirname, '..', 'templates'),
  cwdPath: process.cwd(),
  userTemplatePath: path.join(os.homedir(), '.zcmd/templates')
};