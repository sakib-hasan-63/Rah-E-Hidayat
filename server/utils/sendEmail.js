const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if SMTP configuration is provided in env
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;
  const smtpUser = process.env.SMTP_EMAIL || process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const message = {
      from: `"${process.env.FROM_NAME || 'Rah-e-Hidayat'}" <${process.env.FROM_EMAIL || smtpUser}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<p>${options.message.replace(/\n/g, '<br/>')}</p>`,
    };

    const info = await transporter.sendMail(message);
    console.log('📧 Password reset email dispatched via SMTP:', info.messageId);
    return info;
  } else {
    // In local development or if SMTP is not yet configured in .env, log clearly to server console
    console.log('======================================================================');
    console.log('📧 [MOCK EMAIL SERVICE] To configure real email, set SMTP_* in server/.env');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message:\n${options.message}`);
    console.log('======================================================================');
    return { mock: true, messageId: 'mock-dev-id' };
  }
};

module.exports = sendEmail;
