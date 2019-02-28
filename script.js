#!/usr/bin/env node

const program = require("commander");

const gr = require("./index");
const issues = gr.issues;
const publishEnv = gr.utils.publishEnv;
const packageJson = require("./package.json");

program
    .version(packageJson.version, "-v, --version")
    .option("-t, --token <token>", "gitlab personal token", function (arg) {
        publishEnv("GL_TOKEN", arg);
    })
    .option("-l, --logs <level>", "logs level [error, info, log]", function (arg) {
        publishEnv("GL_VERBOSE", arg);
    }, "error")
    .option("-a, --api <version>", "api version", function (arg) {
        publishEnv("GL_API_VERSION", arg);
    }, "v4")
    .option("-u, --url <url>", "gitlab url", function (arg) {
        publishEnv("GL_URL", arg);
    }, "https://gitlab.com");

// issues
program
    .command("issues <action> [queries...]")
    .description("the actions are [list, my-estimations] and [queries] are a list of query params to attach in the request")
    .action(issues);

program
    .parse(process.argv);
