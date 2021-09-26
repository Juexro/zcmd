const fs = require('fs-extra');
const path = require('path');
const paths = require('./paths');

function getTemplatesList() {
  const list = [];
  try {
    list.push(
      ...fs.readdirSync(paths.userTemplatePath)
        .map(i => ({ type: 'user', name: i, path: path.join(paths.userTemplatePath, i) }))
    );
  } catch (e) { }
  try {
    list.push(
      ...fs.readdirSync(paths.templatePath)
        .map(i => ({ type: 'default', name: i, path: path.join(paths.templatePath, i) }))
    );
  } catch(e) {}
  return list;
}

module.exports = {
  getTemplatesList
};