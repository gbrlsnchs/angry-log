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
            path.join("..", "node_modules/zone.js/dist/zone.js"),
            path.join("..", "/node_modules/reflect-metadata/Reflect.js"),
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
