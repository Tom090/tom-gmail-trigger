"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalConfigHttp = void 0;
const OperationGlobalConfig_1 = require("@trayio/cdk-dsl/connector/operation/OperationGlobalConfig");
/*
 * IMPORTANT NOTE: DO NOT DELETE THIS FILE
 * This is a global configuration that is used by all operations in the connector.
 * Update the baseUrl to the base url of the API.
 * To configure the auth use the withBearerToken method or use addHeader method to add custom headers.
 *
 * IMPORTANT NOTE: Do not change the name of the variable `globalConfigHttp` as it is used by the internal Raw Http Operation.
 * You can ignore this configuration if you have disabled the Raw Http Operation in connector.json
 */
exports.globalConfigHttp = OperationGlobalConfig_1.OperationGlobalConfigHttp.create().withBaseUrl((ctx) => 'https://50767bec-cdbe-4897-a51f-941b2a10c326-api.trayapp.io');
