import { TomGmailTriggerAuth } from '../TomGmailTriggerAuth';
import { ThreadInput } from './input';
import { ThreadOutput } from './output';
export declare const webhookCreateHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, ThreadInput, import("@trayio/commons/dynamictype/DynamicType").DynamicObject>;
export declare const webhookDestroyHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, ThreadInput, import("@trayio/commons/dynamictype/DynamicType").DynamicObject>;
export declare const webhookRequestHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, import("@trayio/cdk-dsl/connector/operation/OperationHandler").TriggerRequestOperationInput<ThreadInput>, import("@trayio/cdk-dsl/connector/operation/OperationHandler").TriggerRequestOperationOutput<ThreadOutput>>;
//# sourceMappingURL=handler.d.ts.map