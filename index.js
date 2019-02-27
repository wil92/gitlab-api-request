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
    .option('-l, --logs <level>', 'logs level [error, info, log]', function (arg) {
        publishEnv('GL_VERBOSE', arg);
    }, 'error')
    .option('-a, --api <version>', 'api version', function (arg) {
        publishEnv('GL_API_VERSION', arg);
    }, 'v4')
    .option('-u, --url <url>', 'gitlab url', function (arg) {
        publishEnv('GL_URL', arg);
    }, 'https://gitlab.com');

// issues
program
    .command('issues <action> [queries...]')
    .description('<action> valid actions are [list, my-estimations]. [queries] query params to attach in the action')
    .action(issues);

program
    .parse(process.argv);
