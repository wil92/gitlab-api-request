#!/usr/bin/env node

const program = require("commander");

const issues = require("./api/issues");
const publishEnv = require("./api/utils/publish-env");
const package = require("./package.json");

program
    .version(package.version, '-v, --version')
    .option('-t, --token <token>', 'user personal token', function (arg) {
        publishEnv('GL_TOKEN', arg);
    });

// issues
program
    .command('issues <action> [queries...]')
    .description('<action> valid actions are [list].\n[queries] query params to attach in the action')
    .action(issues);

program
    .parse(process.argv);
