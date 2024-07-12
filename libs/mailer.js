const nodemailer = require('nodemailer')
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})



exports.sendEmail = async (to, subject = '', text = '') => {
    return new Promise(async (resolve, reject) => {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to, subject, text
        }).then((response) => {
            resolve({
                success: true,
                message: response,
                email: {
                    to, subject
                }
            })
        }).catch((error) => {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                email: {
                    to, subject
                }
            })
        })
    })
}

exports.sendEmailHtml = async (to, subject, html) => {
    return new Promise(async (resolve, reject) => {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to, subject, html,
            
        }).then((response) => {
            resolve({
                success: true,
                message: response,
                email: {
                    to, subject
                }
            })
        }).catch((error) => {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                email: {
                    to, subject
                }
            })
        })
    })
}