"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRequestHandler = exports.webhookDestroyHandler = exports.webhookCreateHandler = void 0;
const OperationHandlerSetup_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandlerSetup");
const GlobalConfig_1 = require("../GlobalConfig");
const OperationHandler_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandler");
exports.webhookCreateHandler = OperationHandlerSetup_1.OperationHandlerSetup.configureTriggerCreateHandler((handler) => handler
    .addInputValidation((validation) => validation
    .condition((ctx, _input) => ctx.auth?.authId !== undefined && ctx.auth?.authId !== '')
    .errorMessage((_ctx, _input) => 'authId is required and cannot be empty'))
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.public_url !== undefined && input.public_url !== '')
    .errorMessage((_ctx, _input) => 'Public URL is required and cannot be empty'))
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.eventTypes !== undefined)
    .errorMessage((_ctx, _input) => 'At least one eventType is required'))
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.threadId !== undefined && input.threadId !== '')
    .errorMessage((_ctx, _input) => 'ThreadId is required and cannot be empty'))
    .withGlobalConfiguration(GlobalConfig_1.globalConfigHttp)
    .usingHttp((http) => http
    .post('/threadsTrigger')
    .handleRequest((ctx, input, request) => request.withBodyAsJson({
    authId: ctx.auth?.authId,
    public_url: input.public_url,
    eventTypes: input.eventTypes,
    userId: ctx.workspaceIdHash,
    threadId: input.threadId
}))
    .handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())));
exports.webhookDestroyHandler = OperationHandlerSetup_1.OperationHandlerSetup.configureTriggerDestroyHandler((handler) => handler
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.public_url !== undefined && input.public_url !== '')
    .errorMessage((_ctx, _input) => 'Public URL is required and cannot be empty'))
    .addInputValidation((validation) => validation
    .condition((ctx, _input) => ctx.auth?.authId !== undefined && ctx.auth?.authId !== '')
    .errorMessage((_ctx, _input) => 'authId is required and cannot be empty'))
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.eventTypes !== undefined)
    .errorMessage((_ctx, _input) => 'At least one eventType is required'))
    .addInputValidation((validation) => validation
    .condition((_ctx, input) => input.threadId !== undefined && input.threadId !== '')
    .errorMessage((_ctx, _input) => 'ThreadId is required and cannot be empty'))
    .withGlobalConfiguration(GlobalConfig_1.globalConfigHttp)
    .usingHttp((http) => http
    .post('/destroyThreadsTrigger')
    .handleRequest((ctx, input, request) => request.withBodyAsJson({
    public_url: input.public_url,
}))
    .handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())));
exports.webhookRequestHandler = OperationHandlerSetup_1.OperationHandlerSetup.configureTriggerRequestHandler((handler) => handler.usingComposite(async (auth, { input, request }, invoke) => {
    if (!request.hasLargeBody) {
        const decodedBody = Buffer.from(request.body, 'base64').toString('utf-8');
        const parsedBody = JSON.parse(decodedBody);
        const subjectHeader = parsedBody.headers.find((header) => header.name === 'Subject');
        const subject = subjectHeader ? subjectHeader.value : '';
        return OperationHandler_1.OperationHandlerResult.success({
            output: {
                id: parsedBody.id,
                threadId: parsedBody.threadId,
                labelIds: parsedBody.labelIds,
                from: parsedBody.from,
                to: parsedBody.to,
                cc: parsedBody.cc,
                bcc: parsedBody.bcc,
                body_text: parsedBody.body_text,
                body_html: parsedBody.body_html,
                subject: subject
            },
            response: OperationHandler_1.TriggerOperationHttpResponse.withStatusCode(200) //this is the response that will be sent to the webhook unless this trigger is request_response
        });
    }
    //We can send a response to the webhook with errors too
    const errorResponse = OperationHandler_1.TriggerOperationHttpResponse.withStatusCode(200);
    return OperationHandler_1.OperationHandlerResult.failure(OperationHandler_1.OperationHandlerError.skipTriggerError('body is too big', errorResponse));
}));
