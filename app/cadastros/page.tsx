import { headers } from "next/headers";
import { Suspense } from "react";
import { columns } from "./_components/columns";
import DataTable from "@/components/data-table";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExportarInscricoes from "./_components/exportar-inscricoes";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default async function CadastrosSuspense() {
	return (
		<Suspense>
			<Cadastros />
		</Suspense>
	);
}

async function Cadastros() {
	const session = await auth();
	const fimInscricoes = new Date('2025-09-28 00:00:00');
	const downloadArquivosData = new Date(process.env.DOWNLOAD_DATE || '2025-09-29 14:00:00');
	const dataAtual = new Date();
	if (!session || dataAtual < fimInscricoes) redirect("/");
	const inscricoes = await fetch("http://localhost:3000/api/cadastro", {
		method: "GET",
		headers: await headers()
	});
	const inscricoesData = await inscricoes.json();
	const podeBaixar = dataAtual >= downloadArquivosData;
	return (
		<div className='px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto flex flex-col gap-6 py-6'>
			<div className="flex justify-between items-center">
			<h1 className='text-xl md:text-4xl font-bold'>Inscrições</h1>
			<div className="flex gap-2">
				{podeBaixar && <Button asChild className="text-white hover:opacity-80">
					<a href="/inscricoes_complementares.zip" download="inscricoes_complementares.zip">
						<Download className="w-4 h-4" />
						Baixar Arquivos
					</a>
				</Button>}
				<ExportarInscricoes />
			</div>
		</div>
			<div className='w-full'>
				<DataTable
					columns={columns}
					data={inscricoesData || []}
				/>
			</div>
		</div>
	);
}
