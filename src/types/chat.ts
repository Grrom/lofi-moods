export default class Chat {
  senderId: string;
  message: string;
  dateSent: Date;
  isVerified: boolean;

  constructor(
    senderId: string,
    message: string,
    dateSent: Date,
    isVerified?: boolean
  ) {
    this.senderId = senderId;
    this.message = message;
    this.dateSent = dateSent;
    this.isVerified = isVerified ?? false;
  }
}
