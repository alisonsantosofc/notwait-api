import handlebars from 'handlebars';
import fs from 'fs';

import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

class HandlebarsEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    // Read handlebars email template file with node file system
    const fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(fileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsEmailTemplateProvider;
