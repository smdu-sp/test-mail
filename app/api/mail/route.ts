import { NextResponse } from "next/server"
import * as nodemailer from "nodemailer";

export async function GET() {
    const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: "unix",
        path: "/usr/sbin/sendmail",
    });

    function enviarEmail() {
        transporter.sendMail(
            {
                from: "vmabreu@prefeitura.sp.gov.br",
                to: "blvieira@prefeitura.sp.gov.br",
                subject: "Test message",
                text: "I hope this message gets delivered!",
            },
            (err, info) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(info.envelope);
                console.log(info.messageId);
            }
        );
    }

    enviarEmail();

    return NextResponse.json({
        status: 200,
    })
}