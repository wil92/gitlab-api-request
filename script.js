#!/usr/bin/env node

const program = require("commander");

const gr = require("./index");

const issues = gr.issues;
const config = gr.config;
const publishEnv = gr.utils.publishEnv;
const packageJson = require("./package.json");

program
    .version(packageJson.version, "-v, --version")
    .option("-t, --token <token>", "gitlab personal token", function (arg) {
        publishEnv("GR_TOKEN", arg);
    })
    .option("-l, --logs <level>", "logs level [error, info, log]", function (arg) {
        publishEnv("GR_VERBOSE", arg);
    }, "error")
    .option("-a, --api <version>", "api version", function (arg) {
        publishEnv("GR_API_VERSION", arg);
    }, "v4")
    .option("-u, --url <url>", "gitlab url", function (arg) {
        publishEnv("GR_URL", arg);
    }, "https://gitlab.com");

// config
program
    .command("config <action> [data]")
    .description("gr global configurations.\n\tUsage:\n\tgr config help\n\t\t  set <config-name>=<config-value>\n\t\t  get <config-name>")
    .action(config);

// issues
program
    .command("issues <action> [queries...]")
    .description("actions over issues api.\n\tUsage:\n\tgr issues list [[query param]...]\n\t\t  my-estimations [[query param]...]")
    .action(issues);

program
    .parse(process.argv);
