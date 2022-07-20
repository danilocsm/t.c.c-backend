import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail.adapter";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ec086ec0b4c8f7",
    pass: "932d1e9fbdd303",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData): Promise<void> {
    await transporter.sendMail({
      from: "Equipe CER <cer@hotmai.com>",
      to: data.to,
      subject: data.subject,
      html: data.body,
    });
  }
}
