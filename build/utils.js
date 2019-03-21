const nodePath = require('path');

const utils = {
    resolve: function (dir) {
        return nodePath.join(__dirname, '..', dir);
    },
    assetsPath: function (path) {
        const assetsSubDirectory = 'static';
        return nodePath.posix.join(assetsSubDirectory, path);
    }
};

module.exports = utils;
