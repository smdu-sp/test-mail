import { Inscricao } from "@prisma/client";


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
    const inscricoes = await prisma?.inscricao.findMany();
    return inscricoes || [];
}

export {
    criar,
    listar
}
