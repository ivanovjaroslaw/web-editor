# UI WebEditor

This application provides FE part of shared document online editor system.

BE subsystem is omitted for the simplicity and just [Firebase](https://firebase.google.com/) is used.

For random name generation [RandomUser](https://randomuser.me/) public API is used. 

## Warning
The app is implemented as part of individual education track in web technologies.

It generally covers only specified stack of technologies with confirmed level of depth.

Future maintenance is not considered.

## Usage
Node.js (>= v10.15.1) with NPM should be installed.

Install required dependencies by `npm install` command.

Add Firebase config into `config/index.js` file according to [Firebase Guide](https://firebase.google.com/docs/web/setup)

### Tasks
- `npm run dev:build` build development version
- `npm run dev:serve` serve development version
- `npm run prod:build` build production version
- `npm run prod:serve` serve production version
- `npm lint` check source code for warnings and errors by [ESLint](https://github.com/eslint/eslint)
- `npm lint:fix` automatically resolve existing warnings and errors by [ESLint](https://github.com/eslint/eslint)
- `npm test` launch Unit Tests

Build and serve production version is also provided with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) report.

### Structure
| Location                  | Purpose   |
| ---                       | ----      |
| /assets                   | -         |
| /build                    | -         |
| /dist                     | -         |
| &nbsp;&nbsp; /dev         | -         |
| &nbsp;&nbsp; /prod        | -         |
| /docs                     | contains documentation (.md files) about the project |
| /src                      | -         |
| &nbsp;&nbsp; /components  | -         |
| &nbsp;&nbsp; /config      | -         |
| &nbsp;&nbsp; /router      | -         |
| &nbsp;&nbsp; /services    | -         |
| &nbsp;&nbsp; /utils       | -         |
| &nbsp;&nbsp; /app.vue     | -         |
| &nbsp;&nbsp; /index.js    | -         |
| /test                     | -         |
| .babelrc                  | -         |
| .eslintignore             | -         |
| .travis.yml               | -         |
| index.html                | -         |

### Documentation
- [Under the Hood](docs/UNDER_THE_HOOD.md) for detailed explanation of architecture and used approaches 
- [Education](docs/EDUCATION.md) for tracking the coverage of web technologies stack
- [Issues](docs/ISSUES.md) for knowing problems
- [Tasks](docs/TASKS.md) for future improvements
