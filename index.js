#!/usr/bin/env node

const program = require("commander");

const issues = require("./api/issues");
const publishEnv = require("./api/utils/publish-env");
const package = require("./package.json");

loadProgram(true);
loadProgram(false);

function loadProgram(readEnv) {
    program
        .version(package.version, '-v, --version')
        .option('-t, --token <token>', 'user personal token', readEnv && function (arg) {
            publishEnv('GL_TOKEN', arg);
        })
        .option('-i, --issues <action>', 'issues', !readEnv && issues)
        .parse(process.argv);
}
