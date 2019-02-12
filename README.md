# UI WebEditor

## Preparation
- `npm install`

## Build

- `npm run dev` produces starting of server
- `npm run build` produces generation of `dist/` directory

# Under the hood

## Dependencies

- Vue: 
    - `"vue"` target JS framework
    - `"vue-router"` routing plugin for target JS framework
- Webpack:
    - General:
        - `webpack` bundler
        - `webpack-cli` *looks unnecessary*
        - `webpack-dev-server` used as built-in server while dev
        - `html-webpack-plugin` allows dynamic injection of script into HTML for HMR
    - CSS
        - `style-loader` adds CSS to the DOM by injecting \<style\>
        - `css-loader` interprets css import in js
    - SCSS (only for explicit usage via import):
        - `"node-sass": "~4.9.0"`
        - `"sass-loader": "~7.0.0"`
    - Vue:
        - `vue-loader` supports all stuff for vue file processing
        - `vue-template-compiler` peerDependency for `vue-loader`
    - Babel:
        - `"babel-core": "~6.26.0"`
        - `"babel-loader": "~7.1.0"`
        - `"babel-preset-env": "~1.7.0"`
    - Lint:
        - `eslint`
        - `eslint-plugin-import`
        - `eslint-plugin-node`
        - `eslint-plugin-promise`
        - `eslint-plugin-standard`
        - `eslint-config-standard`
        - `babel-eslint`
        - `eslint-plugin-vue`
        - `eslint-loader` as pre-loader while build
    - Static Assets:
        - `copy-webpack-plugin`
    - Unit Testing:
        - `jest`
        - `babel-jest`
        - `vue-jest`
        - `jest-serializer-vue`
        - `@vue/test-utils`
    - ?:
        - `mini-css-extract-plugin` 
            - https://itnext.io/vue-js-and-webpack-4-from-scratch-part-3-3f68d2a3c127
            - https://github.com/dfcook/vue-webpack4-template

## Do it right

### Tools

- `npm i package@~version` anyway omits tilde (~) and save caret (^) for `package.json` entry by default
    - it can be changed by `npm config set save-prefix '~'`
- `npm outdated` shows difference between local installed package and available new version
    - `npm update` will update them (but `npm install` won't)
- `npm audit` show possible vulnerabilities of 3rd party deps

## Knowing Issues

### Tools

- SCSS shared global variables support - [https://vue-loader-v14.vuejs.org/ru/configurations/pre-processors.html]
