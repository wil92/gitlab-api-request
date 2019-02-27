# Gitlab api request (script)

Script for make request to the gitlab API


## Installing

```
npm install -g gitlab-api-request
```

## Getting Started

After install the library just type `gr -h` in a terminal and see the documentation.

### Options

#### option `-v / --version`

Output the version number

#### option `-t <token> / --token <token>`

Gitlab personal token

#### option `-l <level> / --logs <level>`

Logs level `error (only show errors)`, `info (show errors and info logs)`, `log (show any log)` (default: "error")

#### option `-a <version> / --api <version>`

Api version (default: "v4")

#### option `-u <url> / --url <utl>`

Gitlab url (default: "https://gitlab.com")

#### option `-h / --help`

Output usage information

### command `issues`

#### action: `list`

List of issues. In the example are filter by `milestone`:

```
gr --token <user-token> issues list "milestone"="2019-02"
```

#### action: `my-estimations`

Estimation and spend time of the filter issues. In the example the issues are filter by `milestone`:

```
gr --token <user-token> issues my-estimations "milestone"="2019-02"
```

result:

```
Estimate 48.5
Spent 0
Issues 17
```


## Testing code

```
npm test
```

For generate the coverage you can use the next script:

```
npm run test:cov
```

## Linting code

```
npm run lint
```

## Built With

* [npm](https://www.npmjs.com/) - Dependency Management
* [mocha](https://mochajs.org/) - The test frameword used
* [chai](https://mochajs.org/) - BDD / TDD assertion library

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Guillermo González** - *Initial work* - [wil92](https://github.com/wil92)
