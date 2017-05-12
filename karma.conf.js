const path = require("path");

module.exports = function(config) {
    config.set({
        basePath: path.resolve(__dirname, "build"),
        browserify: {
            debug: true,
            transform: [
                "brfs"
            ]
        },
        browsers: [
            "Chrome"
        ],
        files: [
            "**/*.spec.js"
        ],
        frameworks: [
            "browserify",
            "jasmine"
        ],
        preprocessors: {
            "**/*.js": [
                "browserify"
            ]
        }
    });
}
