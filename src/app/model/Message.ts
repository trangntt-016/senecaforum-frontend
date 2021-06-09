
export class Message{
  constructor() {
    this.messageId = null;
    this.chatroomId = null;
    this.senderId = null;
    this.recipientId = null;
    this.senderName = "";
    this.recipientName = "";
    this.content = "";
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
