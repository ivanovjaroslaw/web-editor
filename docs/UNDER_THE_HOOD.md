# Under the hood

## Dependencies
- `vue` target JS framework
- `vue-router` routing plugin for target JS framework
- `rxjs` library for reactive programming
- `moment` library for date processing
- `firebase` client to connect with Firebase

## Dev Dependencies

- Webpack general:
    - `webpack` the bundler itself
    - `webpack-dev-server` used as built-in server while serve mode
    - `html-webpack-plugin` allows dynamic injection of script into HTML for HMR
    - `copy-webpack-plugin` for static assets
- CSS
    - `style-loader` adds CSS to the DOM by injecting \<style\>
    - `css-loader` interprets css import in js
    - `mini-css-extract-plugin`
- SCSS (only for explicit usage via import):
    - `node-sass`
    - `sass-loader`
- Vue:
    - `vue-loader` supports all stuff for vue file processing
    - `vue-template-compiler` peerDependency for `vue-loader`
- Babel:
    - `"babel-core"`
    - `"babel-loader"`
- ESLint:
    - `eslint`
    - `eslint-config-standard`
    - `eslint-plugin-vue`
    - `eslint-plugin-import`
    - `eslint-plugin-node`
    - `eslint-plugin-promise`
    - `eslint-plugin-standard`
    - `babel-eslint`
    - `eslint-loader` as pre-loader for Webpack while build
- Unit Testing:
    - `jest`
    - `babel-jest`
    - `vue-jest`
    - `jest-serializer-vue`
    - `identity-obj-proxy` as empty mock for CSS

## Do it right

### Tools

- `npm i package@~version` anyway omits explicit tilde (~) and save caret (^) for `package.json` entry by default
    - it can be changed by `npm config set save-prefix ~`
- `npm outdated` shows difference between local installed packages and available new versions
    - `npm update` will update them (but `npm install` won't)
- `npm audit` shows possible vulnerabilities of 3rd party deps
