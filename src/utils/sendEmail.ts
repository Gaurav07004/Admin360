import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }: { to: string, subject: string, text: string, html: string }) => {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error("Failed to send email");
    }
};

export default sendEmail;
