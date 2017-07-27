/* global fluid */

(function ($, fluid) {

    "use strict";

    var projectComponent = projectTemplate.projectComponent();

    // Basic non-IoC test
    jqUnit.test("Test message content", function() {
        jqUnit.expect(1);
        jqUnit.assertEquals("Test message has expected content", "Hello, world", projectComponent.model.message);
    });

    // Basic IoC test structure

    fluid.defaults("projectTemplate.projectComponentTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test the project component.",
            tests: [{
                name: "Test message content and changes.",
                sequence: [{
                    listener: "projectTemplate.projectComponentTester.testMessageContent",
                    "event": "{projectComponentTest projectComponent}.events.onCreate",
                    args: ["{projectComponent}", "Hello, world"]
                }]
            }]
        }]
    });

    fluid.defaults("floe.tests.projectComponentTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            projectComponent: {
                type: "projectTemplate.projectComponent",
                createOnEvent: "{projectComponentTester}.events.onTestCaseStart"
            },
            projectComponentTester: {
                type: "projectTemplate.projectComponentTester"
            }
        }
    });

    projectTemplate.projectComponentTester.testMessageContent = function (component, expectedMessage) {
        jqUnit.assertEquals("Test message has expected content", expectedMessage, component.model.message);
    };

    floe.tests.projectComponentTest();

})(jQuery, fluid);
