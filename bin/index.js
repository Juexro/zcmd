#!/usr/bin/env node
const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const { program } = require('commander');
const ignore = require('ignore');
const paths = require('../utils/paths');
const { getTemplatesList } = require('../utils/template');

program
  .command('create <template> <destination>')
  .description('clone a template into the specified directory')
  .action((template, destination) => {
    const list = getTemplatesList();
    const selection = list.find(i => i.name === template);
    if (!selection) {
      ora('Please add this template first.').fail();
      return;
    }
    const spinner = ora('Creating template...');
    spinner.start();

    const destPath = path.join(paths.cwdPath, destination);
    const gitignorePath = path.join(selection.path, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const filter = ignore().add(fs.readFileSync(gitignorePath).toString());
      fs.copySync(selection.path, destPath, {
        filter: (src, dest) => {
          const relativePath = path.relative(selection.path, src);
          if (relativePath) {
            return !filter.ignores(relativePath);
          }
          return true;
        }
      });
    } else {
      fs.copySync(selection.path, destPath);
    }
    const projectName = path.basename(destination);
    const pkgJSONPath = path.join(destPath, 'package.json');
    if (fs.existsSync(pkgJSONPath)) {
      const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath).toString('utf-8'));
      pkgJSON.name = projectName;
      fs.writeFileSync(pkgJSONPath, JSON.stringify(pkgJSON, null, 2));
    }

    spinner.succeed('Created');
  });

program
  .command('add <source>')
  .description('add a template')
  .action((source) => {
    const templateName = path.basename(source);
    const list = getTemplatesList();
    if (list.find(i => i.name === templateName)) {
      ora('This template already exists. Please remove it first.').fail();
      return;
    }
    const spinner = ora('Adding template...');
    spinner.start();

    const sourcePath = path.join(paths.cwdPath, source);
    const destPath = path.join(paths.userTemplatePath, templateName);
    const gitignorePath = path.join(sourcePath, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const filter = ignore().add(fs.readFileSync(gitignorePath).toString());
      fs.copySync(sourcePath, destPath, {
        filter: (src, dest) => {
          const relativePath = path.relative(sourcePath, src);
          if (relativePath) {
            return !filter.ignores(relativePath);
          }
          return true;
        }
      });
    } else {
      fs.copySync(sourcePath, destPath);
    }

    spinner.succeed('Added');
  });

program
  .command('remove <template>')
  .description('remove the specified template')
  .action((template) => {
    const list = getTemplatesList();
    const selection = list.find(i => i.name === template);
    if (!selection) {
      ora(`Can't find the template named ${template}.`).fail();
      return;
    }
    const spinner = ora('Removing template...');
    spinner.start();

    fs.removeSync(selection.path);

    spinner.succeed('Removed');
  });

program
  .command('list')
  .description('list templates added')
  .action(() => {
    const list = getTemplatesList();
    console.table(list);
  });

program.parse(process.argv);