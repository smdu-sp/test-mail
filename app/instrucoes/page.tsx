"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function InstrucoesPage() {
  const [activeMethod, setActiveMethod] = useState<'explorer' | 'powershell' | 'third-party'>('explorer');

  const methods = [
    {
      id: 'explorer',
      title: 'Explorador de Arquivos',
      description: 'Método mais simples e nativo do Windows',
      difficulty: 'Fácil',
      time: '2-3 minutos'
    },
    {
      id: 'powershell',
      title: 'PowerShell',
      description: 'Método via linha de comando para usuários avançados',
      difficulty: 'Intermediário',
      time: '1-2 minutos'
    },
    {
      id: 'third-party',
      title: 'Programas de Terceiros',
      description: 'Alternativas com mais recursos e opções',
      difficulty: 'Fácil',
      time: '3-5 minutos'
    }
  ];

  const explorerSteps = [
    {
      step: 1,
      title: 'Localize a pasta',
      description: 'Abra o Explorador de Arquivos e navegue até a pasta que contém os arquivos que você deseja compactar.'
    },
    {
      step: 2,
      title: 'Selecione os arquivos',
      description: 'Selecione todos os arquivos e pastas que deseja incluir no arquivo ZIP. Você pode usar Ctrl+A para selecionar tudo ou Ctrl+clique para selecionar itens específicos.'
    },
    {
      step: 3,
      title: 'Clique com o botão direito',
      description: 'Com os arquivos selecionados, clique com o botão direito do mouse sobre qualquer um dos itens selecionados.'
    },
    {
      step: 4,
      title: 'Escolha "Enviar para"',
      description: 'No menu contextual, vá em "Enviar para" e depois clique em "Pasta compactada (em zip)".'
    },
    {
      step: 5,
      title: 'Aguarde a compactação',
      description: 'O Windows criará automaticamente um arquivo ZIP com o mesmo nome da pasta ou do primeiro arquivo selecionado.'
    },
    {
      step: 6,
      title: 'Renomeie se necessário',
      description: 'O arquivo ZIP será criado na mesma pasta. Você pode renomeá-lo clicando com o botão direito e escolhendo "Renomear".'
    }
  ];

  const powershellSteps = [
    {
      step: 1,
      title: 'Abra o PowerShell',
      description: 'Pressione Win+R, digite "powershell" e pressione Enter, ou procure por "PowerShell" no menu Iniciar.'
    },
    {
      step: 2,
      title: 'Navegue até a pasta',
      description: 'Use o comando "cd" para navegar até a pasta que contém os arquivos. Exemplo: cd "C:\\MinhaPasta"'
    },
    {
      step: 3,
      title: 'Execute o comando de compactação',
      description: 'Digite: Compress-Archive -Path "*.txt" -DestinationPath "arquivo.zip" (substitua "*.txt" pelos arquivos desejados e "arquivo.zip" pelo nome desejado).'
    },
    {
      step: 4,
      title: 'Para compactar uma pasta inteira',
      description: 'Use: Compress-Archive -Path "NomeDaPasta" -DestinationPath "arquivo.zip" -Recurse'
    },
    {
      step: 5,
      title: 'Verifique o resultado',
      description: 'O arquivo ZIP será criado no local especificado. Use "dir" para listar os arquivos e confirmar.'
    }
  ];

  const thirdPartySteps = [
    {
      step: 1,
      title: 'Escolha um programa',
      description: 'Algumas opções populares: 7-Zip (gratuito), WinRAR, WinZip, ou PeaZip.'
    },
    {
      step: 2,
      title: 'Baixe e instale',
      description: 'Baixe o programa do site oficial e instale seguindo as instruções do instalador.'
    },
    {
      step: 3,
      title: 'Abra o programa',
      description: 'Execute o programa de compactação que você instalou.'
    },
    {
      step: 4,
      title: 'Adicione arquivos',
      description: 'Use a interface do programa para navegar e selecionar os arquivos que deseja compactar.'
    },
    {
      step: 5,
      title: 'Configure as opções',
      description: 'Escolha o formato (ZIP, RAR, 7Z, etc.), nível de compressão e local de destino.'
    },
    {
      step: 6,
      title: 'Inicie a compactação',
      description: 'Clique em "Adicionar" ou "Criar" para iniciar o processo de compactação.'
    }
  ];

  const getSteps = () => {
    switch (activeMethod) {
      case 'explorer':
        return explorerSteps;
      case 'powershell':
        return powershellSteps;
      case 'third-party':
        return thirdPartySteps;
      default:
        return explorerSteps;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-[#6CBA74] text-white';
      case 'Intermediário':
        return 'bg-[#EA4379] text-white';
      case 'Avançado':
        return 'bg-[#62458D] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-18">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center p-6">
          <Image width={160} height={160} className="w-28 sm:w-40" src="/cmpu_logo.png" alt={"Logo Concurso Municipal de Política Urbana"} />
          <Image width={160} height={125} className="w-28 sm:w-40" src="/prefeitura_logo.png" alt={"Logo Prefeitura de São Paulo"} />
        </div>

        <div className="flex px-6 pb-4 gap-9">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full px-6 bg-white border-black border-2 w-44 h-13 font-bold text-lg"
            >
              Voltar
            </Button>
          </Link>
        </div>

        <div className="px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[26px] mb-2">
              Como Compactar Arquivos em ZIP no Windows
            </h1>
            <p className="text-[22px] font-medium text-primary">
              Aprenda diferentes métodos para criar arquivos ZIP no Windows de forma simples e eficiente
            </p>
          </div>

          {/* Métodos disponíveis */}
          <div className="mb-6 border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Escolha o método
            </div>
            <div className="border border-gray-300 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {methods.map((method) => (
                  <div
                    key={method.id}
                    className={`border-2 cursor-pointer transition-all hover:shadow-lg p-4 ${
                      activeMethod === method.id ? 'border-[#62458D] bg-purple-50' : 'border-gray-300'
                    }`}
                    onClick={() => setActiveMethod(method.id as any)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(method.difficulty)}`}>
                        {method.difficulty}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                        ⏱️ {method.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instruções passo a passo */}
          <div className="mb-6 border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Instruções Passo a Passo
            </div>
            <div className="border border-gray-300 p-4">
              <p className="text-[20px] text-gray-700 mb-4">
                Siga estes passos para compactar seus arquivos usando o método selecionado
              </p>
              <div className="space-y-4">
                {getSteps().map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-[#62458D] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-[18px]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dicas e informações adicionais */}
          <div className="mb-6 border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Dicas Importantes
            </div>
            <div className="border border-gray-300 p-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-900 mb-2 text-lg">💡 Dicas Gerais</h4>
                  <ul className="text-blue-800 space-y-1 text-[18px]">
                    <li>• Sempre verifique se há espaço suficiente no disco antes de compactar</li>
                    <li>• Para arquivos grandes, considere dividir em múltiplos arquivos ZIP</li>
                    <li>• Use nomes descritivos para seus arquivos ZIP</li>
                    <li>• Mantenha uma cópia dos arquivos originais até confirmar que a compactação foi bem-sucedida</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-900 mb-2 text-lg">⚠️ Atenção</h4>
                  <ul className="text-yellow-800 space-y-1 text-[18px]">
                    <li>• Arquivos já compactados (como JPG, MP3, MP4) não terão redução significativa de tamanho</li>
                    <li>• Arquivos ZIP corrompidos podem não ser recuperáveis</li>
                    <li>• Alguns antivírus podem bloquear arquivos ZIP com muitos arquivos pequenos</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-900 mb-2 text-lg">✅ Vantagens do ZIP</h4>
                  <ul className="text-green-800 space-y-1 text-[18px]">
                    <li>• Reduz o tamanho total dos arquivos</li>
                    <li>• Facilita o envio por email ou upload</li>
                    <li>• Mantém a organização dos arquivos</li>
                    <li>• Compatível com praticamente todos os sistemas operacionais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-6 flex justify-center">
            <Link href="/">
              <Button
                className="bg-[#6CBA74] hover:bg-green-600 text-white w-44 h-13 font-bold px-12 py-3 rounded-full text-lg"
              >
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
