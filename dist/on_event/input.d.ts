export type OnEventInput = {
    /**
* @advanced true
* @default {$.env.public_url}
*/
    public_url: string;
    eventTypes: eventTypes;
};
/**
 * @enumLabels Message Added, Message Deleted, Label Added, Label Removed
 */
export declare enum eventTypes {
    messageAdded = "messageAdded",
    messageDeleted = "messageDeleted",
    labelAdded = "labelAdded",
    labelRemoved = "labelRemoved"
}
//# sourceMappingURL=input.d.ts.map