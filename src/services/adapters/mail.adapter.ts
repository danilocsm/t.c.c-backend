export interface SendMailData {
  subject: string;
  to: string;
  body: string;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}
