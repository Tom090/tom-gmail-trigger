import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { TomGmailTriggerAuth } from '../TomGmailTriggerAuth';
import { globalConfigHttp } from '../GlobalConfig';
import { OnEventInput, eventTypes } from './input';
import { OnEventOutput } from './output';
import { OperationHandlerError, OperationHandlerResult, TriggerOperationHttpResponse } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { Header, parsedBody } from './header';

export const webhookCreateHandler =
    OperationHandlerSetup.configureTriggerCreateHandler<TomGmailTriggerAuth, OnEventInput>((handler) =>
        handler
            .addInputValidation((validation) => 
                validation
                    .condition((ctx, _input) => ctx.auth?.authId !== undefined && ctx.auth?.authId !== '')
                    .errorMessage((_ctx, _input) => 'authId is required and cannot be empty')
            )
            .addInputValidation((validation) => 
                validation
                    .condition((_ctx, input) => input.public_url !== undefined && input.public_url !== '')
                    .errorMessage((_ctx, _input) => 'Public URL is required and cannot be empty')
            )
            .addInputValidation((validation) => 
                validation
                    .condition((_ctx, input) => input.eventTypes !== undefined)
                    .errorMessage((_ctx, _input) => 'At least one eventType is required')
            )
            .withGlobalConfiguration(globalConfigHttp)
			.usingHttp((http) =>
                http
                    .post('/trigger')
                    .handleRequest((ctx, input, request) => 
                        request.withBodyAsJson({
                            authId: ctx.auth?.authId as string,
                            public_url: input.public_url,
                            eventTypes: input.eventTypes,
							userId: ctx.workspaceIdHash as string,
                        })
                    )
                    .handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())
            )
    );

export const webhookDestroyHandler =
	OperationHandlerSetup.configureTriggerDestroyHandler<TomGmailTriggerAuth, OnEventInput>((handler) =>
		handler
			.addInputValidation((validation) => 
                validation
                    .condition((ctx, _input) => ctx.auth?.authId !== undefined && ctx.auth?.authId !== '')
                    .errorMessage((_ctx, _input) => 'authId is required and cannot be empty')
            )
            .addInputValidation((validation) => 
                validation
                    .condition((_ctx, input) => input.public_url !== undefined && input.public_url !== '')
                    .errorMessage((_ctx, _input) => 'Public URL is required and cannot be empty')
            )
            .addInputValidation((validation) => 
                validation
                    .condition((_ctx, input) => input.eventTypes !== undefined)
                    .errorMessage((_ctx, _input) => 'At least one eventType is required')
            )
			.withGlobalConfiguration(globalConfigHttp)
			.usingHttp((http) =>
			http
				.post('/destroy')
				.handleRequest((ctx, input, request) =>
					request.withBodyAsJson({
							authId: ctx.auth?.authId as string,
                            public_url: input.public_url,
                            eventTypes: input.eventTypes,
							userId: ctx.organizationId as string
                        					})
		)
				.handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())
	) 
);

	export const webhookRequestHandler =
    OperationHandlerSetup.configureTriggerRequestHandler<TomGmailTriggerAuth, OnEventInput, OnEventOutput>((handler) =>
        handler.usingComposite(async (auth, { request }, invoke) => {

            if (!request.hasLargeBody) {
                const decodedBody = Buffer.from(request.body, 'base64').toString('utf-8');
				const parsedBody : parsedBody = JSON.parse(decodedBody);
				const subjectHeader = parsedBody.headers.find((header : Header) => header.name === 'Subject')
				const subject = subjectHeader ? subjectHeader.value : ''
				
                return OperationHandlerResult.success({
                    output: {
                        id : parsedBody.id,
						threadId : parsedBody.threadId,
						labelIds : parsedBody.labelIds,
						from: parsedBody.from,
						to: parsedBody.to,
						cc: parsedBody.cc,
						bcc: parsedBody.bcc,
						body_text: parsedBody.body_text,
						body_html: parsedBody.body_html,
						subject: subject
                    },
                    response: TriggerOperationHttpResponse.withStatusCode(200) //this is the response that will be sent to the webhook unless this trigger is request_response
                })
            }

            //We can send a response to the webhook with errors too
            const errorResponse = TriggerOperationHttpResponse.withStatusCode(200)
            return OperationHandlerResult.failure(OperationHandlerError.skipTriggerError('body is too big', errorResponse))
        })
    );
