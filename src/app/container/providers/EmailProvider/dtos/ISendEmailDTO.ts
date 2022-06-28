import IParseEmailTemplateDTO from '../../EmailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface EmailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: EmailContact;
  from?: EmailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
