// app/api/inscricao/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import fs from "fs";
import * as nodemailer from "nodemailer";

const prisma = new PrismaClient();

function geraProtocolo(id: number) {
  const mascara = 17529 * id ** 2 + 85474;
  const chave1 = 7458321;
  const chave2 = 13874219;
  const protocolo = ((mascara + chave1) ^ chave2).toString();
  return `CMPU-2025-${protocolo.padStart(10, "0")}`;
}

function formataEmail(protocolo: string) {
    const emailFormato = `<!DOCTYPE html>
        <html>
        <head>
        <title>Confirmação de Inscrição</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
            }
            .container {
            width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            }
            .content {
            padding: 20px;
            }
            .footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h2>Confirmação de Inscrição</h2>
            </div>
            <div class="content">
            <p>Olá [nome do usuário],</p>
            <p>Sua inscrição foi realizada com sucesso!</p>
            <p>Seu código de protocolo é: <strong>${protocolo}</strong></p>
            </div>
        </div>
        </body>
        </html>`;
    return emailFormato;
}


export async function POST(request: Request) {
    function enviarEmail(email: string, protocolo: string) {
        const transporter = nodemailer.createTransport({
            sendmail: true,
            newline: "unix",
            path: "/usr/sbin/sendmail",
        });
        transporter.sendMail(
            {
                from: "Não Responda - SMUL <smul-naoresponda@prefeitura.sp.gov.br>",
                to: email,
                subject: "CMPU 2025",
                text: "Sua inscrição foi registrada com sucesso! \n\nSeu protocolo de inscrição é: " + protocolo,
                html: formataEmail(protocolo),
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
    try {
        const formData = await request.formData();
        const nomeChapa = formData.get('nomeChapa') as string | null;
        const nomeEntidade = formData.get('nomeEntidade') as string;
        const segmento = formData.get('segmento') as string;
        const is_chapa_str = formData.get('is_chapa') as string;
        const nome = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const arquivo = formData.get('arquivo') as File | null; // O arquivo em si

        const is_chapa = is_chapa_str === 'true';

        let protocolo = "";
        protocolo = await prisma.$transaction(async (tx) => {
            const inscricao = await tx.inscricao.create({
                data: {
                    nomeChapa: nomeChapa || null, 
                    nomeEntidade,
                    segmento, 
                    is_chapa,
                    nome,
                    email,
                }
            });
            const protocolo_gerado = geraProtocolo(inscricao.id);
            if (arquivo) {
                const ext = arquivo.name.split(".").pop();
                const data = await arquivo.arrayBuffer();
                const pasta = `./uploads`;
                if (!fs.existsSync(pasta))
                    fs.mkdirSync(`./uploads`, { recursive: true });
                const caminho = `${pasta}/${protocolo_gerado}.${ext}`;
                fs.writeFileSync(caminho, Buffer.from(data));
                await tx.arquivo.create({
                    data: {
                        caminho,
                        inscricaoId: inscricao.id,
                    }
                });
            }
            await tx.inscricao.update({
                where: { id: inscricao.id },
                data: { protocolo: protocolo_gerado }
            });
            enviarEmail(email, protocolo_gerado);
            return protocolo_gerado;
        });

        if (protocolo && protocolo !== "") return NextResponse.json(protocolo, { status: 201 });
        return NextResponse.json({ message: "Erro ao criar inscrição" }, { status: 500 });
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro ao criar inscrição:", error);
        return NextResponse.json({ message: "Erro ao criar inscrição", error: error.message }, { status: 500 });
    }
}
