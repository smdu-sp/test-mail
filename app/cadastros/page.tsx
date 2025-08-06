import { headers } from "next/headers";
import { Suspense } from "react";
import { columns } from "./_components/columns";
import DataTable from "@/components/data-table";

export default async function CadastrosSuspense() {
	return (
		<Suspense>
			<Cadastros />
		</Suspense>
	);
}

async function Cadastros() {
	const inscricoes = await fetch("http://localhost:3000/api/cadastro", {
		method: "GET",
		headers: await headers()
	});
	const inscricoesData = await inscricoes.json();
	return (
		<div className='flex min-h-svh flex-col items-center gap-6 bg-muted p-6 md:p-10 mx-auto'>
			<h1 className='text-2xl font-bold'>Inscrições</h1>
			<div className="w-[90%]">
				<DataTable
					columns={columns}
					data={inscricoesData || []}
				/>
			</div>
		</div>
	);
}
