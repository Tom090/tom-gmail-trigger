"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationHandlerTest_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandlerTest");
const OperationHandler_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandler");
require("@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner");
const handler_1 = require("./handler");
const input_1 = require("./input");
jest.setTimeout(30000);
OperationHandlerTest_1.OperationHandlerTestSetup.configureHandlerTest(handler_1.webhookCreateHandler, (handlerTest) => handlerTest
    .usingHandlerContext('test')
    .nothingBeforeAll()
    .testCase('should create a webhook', (testCase) => testCase
    .givenNothing()
    .when(() => ({ public_url: "https://00000000-0000-0000-0000-4ceb95fc04c8.trayapp.io", eventTypes: input_1.eventTypes.messageAdded, authId: "87f51502-18cb-4d12-88d1-1511fb095082" }))
    .then(({ output }) => {
    console.log(output);
    expect(output.isSuccess).toBe(true);
})
    .finallyDoNothing())
    .nothingAfterAll());
OperationHandlerTest_1.OperationHandlerTestSetup.configureHandlerTest(handler_1.webhookDestroyHandler, (handlerTest) => handlerTest
    .usingHandlerContext('test')
    .nothingBeforeAll()
    .testCase('should destroy webhook', (testCase) => testCase
    .givenNothing()
    .when(() => ({ public_url: "https://00000000-0000-0000-0000-4ceb95fc04c8.trayapp.io", eventTypes: input_1.eventTypes.messageAdded, authId: "87f51502-18cb-4d12-88d1-1511fb095082" }))
    .then(({ output }) => {
    console.log(output);
    const outputValue = OperationHandler_1.OperationHandlerResult.getSuccessfulValueOrFail(output);
    expect(outputValue.success).toEqual("trigger destroyed");
})
    .finallyDoNothing())
    .nothingAfterAll());
OperationHandlerTest_1.OperationHandlerTestSetup.configureHandlerTest(handler_1.webhookRequestHandler, (handlerTest) => handlerTest
    .usingHandlerContext('test')
    .nothingBeforeAll()
    .testCase('should parse request', (testCase) => testCase
    .givenNothing()
    .when(() => {
    // Define JSON payload
    const jsonPayload = JSON.stringify({
        id: '1234',
        threadId: '1234',
        labelIds: [],
        from: { name: 'Tom', email: 'tom@tray.io' },
        to: [{ name: 'Tom', email: 'tom@tray.io' }],
        cc: [],
        bcc: [],
        body_text: 'test',
        body_html: 'test',
        headers: [{ name: 'Subject', value: 'test' }]
    });
    // Encode payload into a base64 string
    const base64EncodedPayload = Buffer.from(jsonPayload).toString('base64');
    return {
        input: {
            public_url: "",
            eventTypes: input_1.eventTypes.messageAdded,
            authId: ""
        },
        request: {
            hasLargeBody: false,
            method: 'POST',
            path: '/test',
            headers: {},
            query: {},
            body: base64EncodedPayload
        }
    };
})
    .then(({ output }) => {
    const result = OperationHandler_1.OperationHandlerResult.getSuccessfulValueOrFail(output);
    console.log(output);
    expect(result.output).toEqual({
        id: "1234",
        threadId: "1234",
        labelIds: [],
        from: { name: 'Tom', email: 'tom@tray.io' },
        to: [{ name: 'Tom', email: 'tom@tray.io' }],
        cc: [],
        bcc: [],
        body_text: 'test',
        body_html: 'test',
        subject: 'test'
    });
})
    .finallyDoNothing())
    .nothingAfterAll());
