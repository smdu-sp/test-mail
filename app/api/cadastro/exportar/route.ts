import { auth } from "@/auth";
import { exportar } from "@/services/inscricao";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const dataInicio = searchParams.get('dataInicio') || '';
  const dataFim = searchParams.get('dataFim') || '';
  const gte = dataInicio && dataInicio !== "" ? new Date(dataInicio) : undefined;
  const lte = dataFim && dataFim !== "" ? new Date(dataFim) : undefined;
  const { headers, rows } = await exportar({ gte, lte });
  
  // Criar workbook e worksheet
  const workbook = XLSX.utils.book_new();
  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
  // Adicionar worksheet ao workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscrições');
  
  // Gerar buffer do arquivo XLSX
  const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
  const filename = `inscricoes-${new Date().toISOString().split('T')[0]}.xlsx`;
  return new NextResponse(xlsxBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

