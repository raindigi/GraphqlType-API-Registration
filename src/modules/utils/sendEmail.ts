import nodemailer from "nodemailer";

// tslint:disable-next-line:typedef
export async function sendEmail(email: string, url: string) {
    // tslint:disable-next-line:typedef
    const account = await nodemailer.createTestAccount();

    // tslint:disable-next-line:typedef
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // tslint:disable-next-line:typedef
    const mailOptions = {
        // tslint:disable-next-line:quotemark
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔",
        text: "Hello world?", // plain text body
        html: `<a href="${url}">${url}</a>` // html body
    };

    // tslint:disable-next-line:typedef
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}