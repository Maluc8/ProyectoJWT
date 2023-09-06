// import nodemailer from 'nodemailer';
import config from '../../config/index.js';
import { resolve } from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import transport from '../../utils/mailer.js';

class EmailManager{
    constructor(){
        this.smtp_config = {
            service: config.smtpHost,
            port: config.smtpPort,
            auth:{
                user: config.smtpUserName,
                pass: config.smtpPassword
            }
        };
    }

    async send(templateFile, dto){
        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template({
            userName: dto.name,
            link: `http://${config.URL}/api/email/recovery/${dto.token}`
        });
        const mailOptions = {
            from: `"${config.smtpSenderEmailDefault}" <${config.smtpSenderEmailDefault}>`,
            to:  `${dto.email}`,
            subject: 'Password recovery',
            html
        };

        await transport.sendMail(mailOptions);
    }
}

export default EmailManager;
