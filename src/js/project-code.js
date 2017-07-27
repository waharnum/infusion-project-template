/* global fluid */

(function ($, fluid) {

    "use strict";

    fluid.defaults("projectTemplate.projectComponent", {
        gradeNames: ["fluid.modelComponent"],
        model: {
            "message": "Hello, world"
        },
        listeners: {
            "onCreate.announce": {
                "this": "console",
                "method": "log",
                "args": ["{that}.model.message"]
            }
        }
    });

})(jQuery, fluid);
