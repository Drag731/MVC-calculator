'use strict';

const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: "./app",
    output: {
        path: __dirname + "/dist",
        filename: "build.js",
    }
};