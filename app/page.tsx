"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FileDown } from "lucide-react";

export default function CMPUForm() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-18">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center p-6">
          <Image className="w-40" width={160} height={100} src="/cmpu_logo.png" alt={"logo cmpu"} />
          <Image className="w-40" width={160} height={100} src="/prefeitura_logo.png" alt={"logo sp"} />
        </div>
        <div className="w-full">
          <div className="w-[96%] border-b-4 border-black mt-2 mx-auto mb-4"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Arquivos de inscritos</h1>
          <Link href="/uploads.zip">
            <Button>
              <FileDown />
              Baixar arquivos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
