export type ThreadInput = {
	/**
* @advanced true
* @default {$.env.public_url}
*/
	public_url: string
  
	eventTypes: eventTypes;

	threadId: string
}

/**
 * @enumLabels Message Added, Message Deleted, Label Added, Label Removed
 */
	
	export enum eventTypes {
		messageAdded = 'messageAdded',
		messageDeleted = 'messageDeleted',
		labelAdded = 'labelAdded',
		labelRemoved = 'labelRemoved'
}
