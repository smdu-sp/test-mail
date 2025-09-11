import { auth } from "@/auth";
import * as inscricao from "@/services/inscricao";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Nenhum usuário logado." }, { status: 401 });
    try {
        const inscricoes = await inscricao.listar()
        return NextResponse.json(inscricoes, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar setores:", error);
        return NextResponse.json({ error: "Erro ao buscar setores" }, { status: 500 });
    }
}