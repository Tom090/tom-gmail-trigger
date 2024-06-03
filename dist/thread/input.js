"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypes = void 0;
/**
 * @enumLabels Message Added, Message Deleted, Label Added, Label Removed
 */
var eventTypes;
(function (eventTypes) {
    eventTypes["messageAdded"] = "messageAdded";
    eventTypes["messageDeleted"] = "messageDeleted";
    eventTypes["labelAdded"] = "labelAdded";
    eventTypes["labelRemoved"] = "labelRemoved";
})(eventTypes || (exports.eventTypes = eventTypes = {}));
