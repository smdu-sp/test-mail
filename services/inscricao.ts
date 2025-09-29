import { Inscricao } from ".prisma/client";
import { db } from "@/lib/prisma";

async function criar(data: FormData): Promise<any> { 
    try {
        const response = await fetch('/api/inscricao', {
            method: 'POST',
            body: data, 
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao criar inscrição');
        }
        return await response.json();
    } catch (error: any) {
        console.error("Erro no serviço de inscrição:", error);
        throw error;
    }
}

async function listar(): Promise<Inscricao[]> {
    const inscricoes = await db.inscricao.findMany({
        where: {
            createdAt: {
                gte: new Date(process.env.INSCRICAO_DATE || '2025-09-15 00:00:00')
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    return inscricoes || [];
}

async function exportar({ gte, lte }: { gte?: Date, lte?: Date }): Promise<{ headers: string[], rows: (string | null | undefined)[][] }> {
    gte = gte || new Date(process.env.INSCRICAO_DATE || '2025-09-15 00:00:00');
    const inscricoes = await db.inscricao.findMany({
        where: {
            createdAt: {
                ...(gte && { gte }),
                ...(lte && { lte }),
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    if (!inscricoes || inscricoes.length === 0) {
        return { headers: [], rows: [] };
    }
    
    const headers = [
        "Data Inscrição",
        "Protocolo",
        "Tipo",
        "Segmento",
        "Chapa",
        "Entidade",
        "Nome",
        "Email"
    ];

    const rows: (string | null)[][] = [];
    inscricoes.forEach(inscricao => {
        rows.push([
            `${inscricao.createdAt.toLocaleDateString()} ${inscricao.createdAt.toLocaleTimeString()}`,
            inscricao.protocolo || '',
            inscricao.is_chapa ? 'Chapa' : 'Individual',
            inscricao.segmento,
            inscricao.nomeChapa || '-',
            inscricao.nomeEntidade,
            inscricao.nome,
            inscricao.email,
        ]);
    });

    return { headers, rows };
}

export {
    criar,
    listar,
    exportar
}
