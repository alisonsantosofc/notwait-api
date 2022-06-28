import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

export default interface IEmailTemplateProvider {
  parse({ template, variables }: IParseEmailTemplateDTO): Promise<string>;
}
