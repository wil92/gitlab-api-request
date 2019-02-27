#!/usr/bin/env node

const program = require("commander");

const issues = require("./api/issues");
const package = require("./package.json");


program
    .version(package.version, '-v, --version')
    .option('-i, --issues <action>', 'issues', issues, 'list')
    .parse(process.argv);
