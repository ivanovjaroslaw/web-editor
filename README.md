# UI WebEditor

This application provides FE part of shared document online editor system.

BE subsystem is omitted for the simplicity and just [Firebase](https://firebase.google.com/) is used. 

## Warning
The app is implemented as part of individual education track in web technologies.

It generally covers only specified stack of technologies with confirmed level of depth.
Future maintenance is not considered.

## Usage
Node.js (>= v10.15.1) with NPM should be installed.
- add Firebase config into `config/index.js` file according to [Firebase Guide](https://firebase.google.com/docs/web/setup)
- `npm install` for installing required dependencies
- `npm start` for starting development server
- `npm prod` for building production version in `dist/` directory
- `npm lint` for checking source code by [ESLint](https://github.com/eslint/eslint)
- `npm test` for launching Unit Tests

### Structure
| Directory | Purpose   |
| ---       | ----      |
| assets    | -         |
| build     | -         |
| config    | -         |
| src       | -         |
| static    | -         |
| test      | -         |

### Details
For detailed explanation see [Under the Hood](UNDER_THE_HOOD.md)

### Education Track
Tracked here: [Education](EDUCATION.md)