import * as inscricao from "@/services/inscricao";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const inscricoes = await inscricao.listar()
        return NextResponse.json(inscricoes, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar setores:", error);
        return NextResponse.json({ error: "Erro ao buscar setores" }, { status: 500 });
    }
}