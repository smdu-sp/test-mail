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
		header: 'Chapa',
		cell: ({ row }) => {
			const chapa = row.original.nomeChapa;
			const shortChapa = chapa?.substring(0, 50) || '-';
			return (
				<span title={chapa || '-'}>
					{shortChapa}{chapa && chapa.length > 50 && "..."}
				</span>
			);
		},
	},
	{
		accessorKey: 'nomeEntidade',
		header: 'Entidade',
		cell: ({ row }) => {
			const entidade = row.original.nomeEntidade;
			const shortEntidade = entidade?.substring(0, 50) || '-';
			return (
				<span title={entidade || '-'}>
					{shortEntidade}{entidade.length > 50 && "..."}
				</span>
			);
		},
	},
	{
		accessorKey: 'segmento',
		header: 'Segmento',
		cell: ({ row }) => {
			const segmento = row.original.segmento;
			const shortSegmento = segmento?.substring(0, 50) || '-';
			return (
				<span title={segmento || '-'}>
					{shortSegmento}{segmento.length > 50 && "..."}
				</span>
			);
		},
	},
	{
		accessorKey: 'is_chapa',
		header: () => <p className='text-center'>Tipo</p>,
		cell: ({ row }) => {
			const chapa = row.original.is_chapa;
			return (
				<div className='flex items-center justify-center'>
					<Badge variant={`${chapa ? 'default' : 'secondary'}`} className='text-white'>
						{chapa ? 'Chapa' : 'Individual'}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'nome',
		header: 'Nome',
		cell: ({ row }) => {
			const nome = row.original.nome;
			const shortNome = nome?.substring(0, 50) || '-';
			return (
				<span title={nome || '-'}>
					{shortNome}{nome.length > 50 && "..."}
				</span>
			);
		},
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
		cell: ({ row }) => {
			const email = row.original.email;
			const shortEmail = email?.substring(0, 50) || '-';
			return (
				<span title={email || '-'}>
					{shortEmail}{email.length > 50 && "..."}
				</span>
			);
		},
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
