import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

export default async function Arquivos() {
	const downloadArquivosData = new Date(process.env.DOWNLOAD_DATE || '2025-09-29 14:00:00');
	const dataAtual = new Date();
	const podeBaixar = dataAtual >= downloadArquivosData;
	return (
        <div className="flex flex-col min-h-screen bg-gray-100 md:px-18">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center p-6">
                    <Image width={160} height={160} className="w-28 sm:w-40" src="/cmpu_logo.png" alt={"Logo Concurso Municipal de Política Urbana"} />
                    <Image width={160} height={125} className="w-28 sm:w-40" src="/prefeitura_logo.png" alt={"Logo Prefeitura de São Paulo"} />
                </div>

                <div className="flex px-6 pb-4 gap-9">
                    {podeBaixar && <Button asChild className="text-white hover:opacity-80">
                        <a href="/inscricoes_complementares.zip" download="inscricoes_complementares.zip">
                            <Download className="w-4 h-4" />
                            Baixar Arquivos
                        </a>
                    </Button>}
                </div>
            </div>
        </div>
	);
}
