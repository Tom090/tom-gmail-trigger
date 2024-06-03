import { TomGmailTriggerAuth } from '../TomGmailTriggerAuth';
import { OnEventInput } from './input';
import { OnEventOutput } from './output';
export declare const webhookCreateHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, OnEventInput, import("@trayio/commons/dynamictype/DynamicType").DynamicObject>;
export declare const webhookDestroyHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, OnEventInput, import("@trayio/commons/dynamictype/DynamicType").DynamicObject>;
export declare const webhookRequestHandler: import("@trayio/cdk-dsl/connector/operation/OperationHandler").OperationHandlerReference<TomGmailTriggerAuth, import("@trayio/cdk-dsl/connector/operation/OperationHandler").TriggerRequestOperationInput<OnEventInput>, import("@trayio/cdk-dsl/connector/operation/OperationHandler").TriggerRequestOperationOutput<OnEventOutput>>;
//# sourceMappingURL=handler.d.ts.map