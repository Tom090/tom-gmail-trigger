import { Oauth2OperationHandlerAuth } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
export type GmailUserAuth = {
    id: string;
};
export type GmailAppAuth = {};
export type TomGmailTriggerAuth = Oauth2OperationHandlerAuth<GmailUserAuth, GmailAppAuth>;
//# sourceMappingURL=TomGmailTriggerAuth.d.ts.map