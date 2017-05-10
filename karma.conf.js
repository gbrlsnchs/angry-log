const path = require("path");

module.exports = function(config) {
    config.set({
        basePath: path.resolve(__dirname, "src"),
        browsers: [
            "Chrome"
        ],
        files: [
            "**/*.spec.ts"
        ],
        frameworks: [
            "jasmine",
            "karma-typescript"
        ],
        preprocessors: {
            "**/*.ts": [
                "karma-typescript"
            ]
        }
    });
}
