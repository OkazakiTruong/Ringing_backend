import nodemailer from 'nodemailer'
import config from '../config/config';

class EmailService {
    transporter: any
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        })
    }

    async sendMail(options: any) {
        try {
            const info = await this.transporter.sendMail(options)
            console.log('Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Email error:', error);
            throw error;
        }
    }
}

const emailSerivce = new EmailService();
export default emailSerivce