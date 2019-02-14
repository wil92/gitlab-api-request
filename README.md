# Gitlab api request (script)

Script for make request to the gitlab API

### Prerequisites

#### 1. Install node and npm ([https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager))
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Installing

#### 1. Clone project
```
git clone https://gitlab.com/wil92/wankar-server.git
```

#### 2. Development environment configuration:
- Export this environment variables

  * `GL_TOKEN`: User personal token for access to the gitlab api. ex: `faDdf234AD`. (**required**)
  * `GL_URL`: Gitlab repository url. ex: `https://gitlab.com`. (**required**)
  * `GL_API_VERSION`: Gitlab repository API version. ex: `v4`.
  * `GL_ENDPOINT`: port for expose the project database, ex: `issues`. (**required**)


## Testing code

### Running code tests
```
npm test
```

## Built With

* [npm](https://www.npmjs.com/) - Dependency Management
* [mocha](https://mochajs.org/) - The test frameword used
* [chai](https://mochajs.org/) - BDD / TDD assertion library

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Guillermo González** - *Initial work* - [wil92](https://github.com/wil92)
