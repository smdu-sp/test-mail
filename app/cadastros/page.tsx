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
		<div className='px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto flex flex-col gap-6 py-6'>
			<h1 className='text-xl md:text-4xl font-bold'>Inscrições</h1>
			<div className='w-full'>
				<DataTable
					columns={columns}
					data={inscricoesData || []}
				/>
			</div>
		</div>
	);
}
