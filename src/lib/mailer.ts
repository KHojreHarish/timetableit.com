import nodemailer from "nodemailer";

export const createCalendarEmailNotice = (toEmail: any, data: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PASS,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: "calendar.online",
      to: `${toEmail}`,
      subject: "Your Calendar  Has Been Created!",
      html: `
Hi ${toEmail},

This email confirms that a new calendar ${data.title} has been created for you. You can access it by clicking the following link:

calclo.vercel.app/${data.id}`,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};
