'use client';

import { Inscricao } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Inscricao>[] = [
	{
		accessorKey: 'protocolo',
		header: 'Protocolo',
	},
	{
		accessorKey: 'nomeChapa',
		header: 'Nome da Chapa',
	},
	{
		accessorKey: 'nomeEntidade',
		header: 'Nome da Entidade',
	},
	{
		accessorKey: 'segmento',
		header: 'Segmento',
	},
	{
		accessorKey: 'is_chapa',
		header: () => <p className='text-center'>Chapa</p>,
		cell: ({ row }) => {
			const chapa = row.original.is_chapa;
			return (
				<div className='flex items-center justify-center'>
					<Badge variant={`${chapa ? 'default' : 'secondary'}`}>
						{chapa ? 'Chapa' : 'Individual'}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'nome',
		header: 'Nome',
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
	},
	{
		accessorKey: 'createdAt',
		header: () => <p className='text-center'>Data de Inscrição</p>,
		cell: ({ row }) => {
			const createdAt = new Date(row.original.createdAt);
			return (
				<div className='flex items-center justify-center'>
					{createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString()}
				</div>
			);
		},
	},
];
