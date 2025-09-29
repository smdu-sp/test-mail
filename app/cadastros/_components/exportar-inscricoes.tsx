"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useTransition } from "react";

export interface IFiltrosCadastro {
    dataInicio?: string;
    dataFim?: string;
}
export default function ExportarInscricoes({ filtros }: { filtros?: IFiltrosCadastro }) {
    const [isPending, startTransition] = useTransition();
    const handleExportar = async () => {
        startTransition(async () => {
            const response = await fetch(`/api/cadastro/exportar?dataInicio=${filtros?.dataInicio || ""}&dataFim=${filtros?.dataFim || ""}`);
            if (!response.ok) throw new Error('Erro ao exportar inscricoes');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const agora = (new Date()).getTime();
            a.href = url;
            a.download = `inscricoes-${agora}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }

    return (
        <Button className='hover:opacity-80 text-white' onClick={handleExportar} disabled={isPending}>
            <Download className='w-4 h-4' />
            {isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Exportar inscrições'}
        </Button>
    )
}
