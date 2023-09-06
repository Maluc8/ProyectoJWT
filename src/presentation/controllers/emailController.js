import EmailManager from '../../domain/managers/emailManager.js';
import userManager from '../../domain/managers/userManager.js';
import { resolve } from 'path';
import { generateToken, decodeToken } from '../../utils/index.js';
import fs from 'fs';
import Handlebars from 'handlebars';

export const sendEmail = async(req, res, next) => {
  try {
    // console.log('emailController sendEmail req.query.email\n', req.query.email);
    const usersManager =  new userManager();
    const user = await usersManager.getOneByEmail(req.query.email);
    const manager = new EmailManager();
    const dto = {
      user: user.id.toString(),
      date: Date.now()
    };
    dto.token = await generateToken(dto);
    await manager.send('forgotPassword.hbs', { ...dto, email: user.email, name: user.firstName });

    res.send({ status: 'success' });
  }
  catch (e){
		next(e);
	}
};

export const recoveryPage = async(req, res, next) => {
  const dto = decodeToken(req.params.token);
  // console.log('emailController recoveryPage dto\n', dto);
  const templatePath = resolve('src/presentation/templates/accessRecovery.hbs');
  const source = fs.readFileSync(templatePath).toString();
  const template = Handlebars.compile(source);
  const html = template({
    csrfToken: req.csrfToken()
  });
  res.send(html);
};

export const updatePass = async(req, res) => {
  console.log('emailController updatePass req\n', req);
};
