# Gitlab api request (script)

Script for make request to the gitlab API


## Installing

```
npm install -g gitlab-api-request
```

## Getting Started

After install the library just type `gr -h` in a terminal and see the documentation.

### Issues command

An example for see all the estimation time, you can use the next example:
```
gr -logs info -token 3aSAkG6bisadf2345-sRU issues my-estimations "milestone"="2019-02"
```

the result will be something like this:
```
Estimate 48.5
Spent 0
Issues 17
```


## Testing code

not yet

## Built With

* [npm](https://www.npmjs.com/) - Dependency Management
* [mocha](https://mochajs.org/) - The test frameword used
* [chai](https://mochajs.org/) - BDD / TDD assertion library

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Guillermo González** - *Initial work* - [wil92](https://github.com/wil92)
