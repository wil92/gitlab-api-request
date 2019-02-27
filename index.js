#!/usr/bin/env node

const program = require("commander");

const issues = require("./api/issues");
const publishEnv = require("./api/utils/publish-env");
const package = require("./package.json");


program
    .version(package.version, '-v, --version')
    .option('-t, --token <token>', 'user personal token', function (arg) {
        publishEnv('GL_TOKEN', arg);
    })
    .option('-i, --issues <action>', 'issues', issues)
    .parse(process.argv);
