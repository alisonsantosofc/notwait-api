import nodemailer, { Transporter } from 'nodemailer';

import IEmailProvider from '../models/IEmailProvider';

class EtherealEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: '"Suporte Equipe Beurifu 👨‍🔧️" <suportebeurifu@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Recuperação de Senha', // Subject line
      text: body, // plain text body
      // html: '<b>Hello world?</b>', // html body
    });

    // Preview only available when sending through an Ethereal account
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealEmailProvider;
