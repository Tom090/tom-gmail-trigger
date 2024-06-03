import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { webhookCreateHandler, webhookDestroyHandler, webhookRequestHandler} from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
import { eventTypes } from './input';


jest.setTimeout(30000)

OperationHandlerTestSetup.configureHandlerTest(
	webhookCreateHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should create a webhook', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({public_url : "https://00000000-1111-0000-0000-4ceb95fc04c8.trayapp.io", eventTypes : eventTypes.messageAdded, authId : "87f51502-0000-4d12-88d1-1511fb095082", threadId : '0000000'}))
				.then(({ output }) => {
					console.log(output)
					expect(output.isSuccess).toBe(true)
				})
				.finallyDoNothing()
		)
		.nothingAfterAll(),
);

OperationHandlerTestSetup.configureHandlerTest(
	webhookDestroyHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should destroy webhook', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({public_url : "https://00000000-1111-0000-0000-4ceb95fc04c8.trayapp.io", eventTypes : eventTypes.messageAdded, authId : "87f51502-18cb-4d12-88d1-1511fb095082", threadId: '0000000'}))
					.then(({ output }) => {
						console.log(output)
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						expect(outputValue.success).toEqual("trigger destroyed")
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);

OperationHandlerTestSetup.configureHandlerTest(
	webhookRequestHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should parse request', (testCase) =>
				testCase
					.givenNothing()
					.when(() => {
                        // Define JSON payload
                        const jsonPayload = JSON.stringify({
                            id: '1234',
                            threadId: '1234',
                            labelIds: [],
                            from: {name: 'Tom', email: 'tom@tray.io'},
                            to: [{name: 'Tom', email: 'tom@tray.io'}],
                            cc: [],
                            bcc: [],
                            body_text: 'test',
                            body_html: 'test',
                            headers: [{name:'Subject',value:'test'}]
                        });

                        // Encode payload into a base64 string
                        const base64EncodedPayload = Buffer.from(jsonPayload).toString('base64');

                        return {
                            input: {
                                public_url: "",
                                eventTypes: eventTypes.messageAdded,
                                authId: "",
								threadId: ""
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
						const result = OperationHandlerResult.getSuccessfulValueOrFail(output)
						console.log(output)
						
						expect(result.output).toEqual({
							id: "1234",
							threadId: "1234",
							labelIds: [],
							from: {name: 'Tom', email: 'tom@tray.io'},
							to: [{name: 'Tom', email: 'tom@tray.io'}],
							cc: [],
                            bcc: [],
                            body_text: 'test',
                            body_html: 'test',
							subject: 'test'
						})
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);