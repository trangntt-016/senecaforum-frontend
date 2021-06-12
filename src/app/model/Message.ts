
export class Message{
  constructor(senderId: string, senderName: string, recipientId: string, recipientName: string, content: string) {
    this.messageId = null;
    this.chatroomId = null;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.senderName = senderName;
    this.recipientName = recipientName;
    this.content = content;
    this.createdOn = new Date();
    this.status = "RECEIVED";
  }
  messageId: number;
  chatroomId: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  recipientName: string;
  content: string;
  createdOn: Date;
  status: string;
}
