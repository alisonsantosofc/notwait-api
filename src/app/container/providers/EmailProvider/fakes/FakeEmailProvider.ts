import IEmailProvider from '../models/IEmailProvider';

interface Message {
  to: string;
  body: string;
}

class FakeEmailProvider implements IEmailProvider {
  private messages: Message[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}

export default FakeEmailProvider;
