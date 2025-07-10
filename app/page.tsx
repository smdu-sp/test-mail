"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
import Link from "next/link";
// import cmpu from "../public/logo-final-eleicao-CMPU_300x200.png"
// import logo from "../public/logo-urban.png"
import { createInscricao } from "@/services/inscricao";
import { toast } from "sonner";

export default function CMPUForm() {
  const [tipoInscricao, setTipoInscricao] = useState("chapa");

  const [nomeChapa, setNomeChapa] = useState("");
  const [nomeEntidade, setNomeEntidade] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");

  const [segmento, setSegmento] = useState("");

  const [documentoCandidato, setDocumentoCandidato] = useState<File | null>(null);

  const [confirmo, setConfirmo] = useState(false);

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!nomeEntidade || !nome || !email || !confirmeEmail || !segmento || !documentoCandidato) {
        setMessage({ type: 'error', text: "Por favor, preencha todos os campos obrigatórios e confirme as informações." });
        setLoading(false);
        return;
      }

      if (email !== confirmeEmail) {
        setMessage({ type: 'error', text: "Os e-mails não coincidem. Por favor, verifique." });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('nomeChapa', nomeChapa);
      formData.append('nomeEntidade', nomeEntidade);
      formData.append('segmento', segmento);
      formData.append('is_chapa', String(tipoInscricao === "chapa"));
      formData.append('nome', nome);
      formData.append('email', email);

      if (documentoCandidato) {
        formData.append('arquivo', documentoCandidato);
      }

      const response = await createInscricao(formData);
      console.log(response);
      if (response && response !== "") {
        toast.success('Inscrição enviada com sucesso! Protocolo: ' + response);
        // setMessage({ type: 'success', text: `Inscrição enviada com sucesso! Protocolo: ${response}` });
      }

      setNomeChapa("");
      setNomeEntidade("");
      setNome("");
      setEmail("");
      setConfirmeEmail("");
      setSegmento("");
      setDocumentoCandidato(null);
      setConfirmo(false);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao enviar inscrição:", error);
      toast.error('Ocorreu um erro ao enviar sua inscrição. Tente novamente mais tarde.');
      // setMessage({ type: 'error', text: error.message || "Ocorreu um erro ao enviar sua inscrição. Tente novamente mais tarde." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-18">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center p-6">
          {/* <Image className="w-40" src={cmpu} alt={"logo cmpu"} />
          <Image className="w-40" src={logo} alt={"logo sp"} /> */}
        </div>

        <div className="flex px-6 pb-4 gap-9">
          <Link
            href="https://prefeitura.sp.gov.br/web/licenciamento/w/edital-nº-001/2025/cmpu-procedimentos-de-eleição-dos-representantes-da-sociedade-civil-para-compor-o-conselho-municipal-de-política-urbana-cmpu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-full px-6 bg-white border-black border-2 w-44 h-13 font-bold text-lg"
            >
              Edital
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row px-6 pb-6 justify-between">
          <div className="mb-2">
            <div className="font-semibold text-sm text-[26px]">
              Tipo de inscrição
            </div>
            <div className="text-xs text-[22px] font-medium text-primary">
              Escolha o tipo de inscrição que deseja realizar
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setTipoInscricao("chapa")}
              className={`bg-[#62458D] hover:bg-purple-700 text-white px-8 py-2 rounded-full w-44 h-13 font-bold text-lg transition-opacity duration-300 ${tipoInscricao !== "chapa" && "opacity-70"
                }`}
            >
              Chapa
            </Button>
            <Button
              onClick={() => setTipoInscricao("individual")}
              variant="outline"
              className={`bg-[#EA4379] hover:bg-pink-600  text-white px-8 py-2 rounded-full border-pink-500 w-44 h-13 font-bold text-lg transition-opacity duration-300 ${tipoInscricao !== "individual" && "opacity-70"
                }`}
            >
              Individual
            </Button>
          </div>
        </div>
        <div className="w-full">
          <div className="w-[96%] border-b-4 border-black mt-2 mx-auto mb-4"></div>
        </div>

        <div className="px-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[26px]">
              Formulário de inscrição de candidatura
            </h2>
            <p className="text-[22px] font-medium text-primary">
              Preencha os campos abaixo para realizar a inscrição para uma das
              22 vagas no Conselho Municipal de Política Urbana (CMPU)
            </p>
          </div>

          {message && (
            <div className={`p-3 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="mb-6 border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Informações da chapa
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              {tipoInscricao === "chapa" && (
                <div>
                  <Label htmlFor="nome-chapa" className="text-sm font-medium">
                    Nome da chapa
                  </Label>
                  <Input
                    id="nome-chapa"
                    value={nomeChapa}
                    onChange={(e) => setNomeChapa(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="nome-entidade" className="text-sm font-medium">
                  Nome da entidade
                </Label>
                <Input
                  id="nome-entidade"
                  value={nomeEntidade}
                  onChange={(e) => setNomeEntidade(e.target.value)}
                  className="mt-1 border-black border-2 h-[50px]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Segmento</Label>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-moradia" name="segmento" value="Movimento de moradia" checked={segmento === "Movimento de moradia"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-moradia">Movimento de moradia</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-academicas" name="segmento" value="Entidades acadêmicas e de pesquisa" checked={segmento === "Entidades acadêmicas e de pesquisa"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="entidades-academicas">Entidades acadêmicas e de pesquisa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimentos-mobilidade" name="segmento" value="Movimentos de Mobilidade Urbana" checked={segmento === "Movimentos de Mobilidade Urbana"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimentos-mobilidade">Movimentos de Mobilidade Urbana</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="trabalhadores-sindicais" name="segmento" value="Trabalhadores, por suas entidades sindicais" checked={segmento === "Trabalhadores, por suas entidades sindicais"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="trabalhadores-sindicais">Trabalhadores, por suas entidades sindicais</label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="associacoes-bairro" name="segmento" value="Associações de bairro" checked={segmento === "Associações de bairro"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="associacoes-bairro">Associações de bairro</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-ambientalista" name="segmento" value="Movimentos ambientalistas" checked={segmento === "Movimentos ambientalistas"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-ambientalista">Movimentos ambientalistas</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-cultural" name="segmento" value="Movimento Cultural" checked={segmento === "Movimento Cultural"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-cultural">Movimento Cultural</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-profissionais" name="segmento" value="Entidades Profissionais" checked={segmento === "Entidades Profissionais"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="entidades-profissionais">Entidades Profissionais</label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="setor-empresarial" name="segmento" value="Setor empresarial" checked={segmento === "Setor empresarial"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="setor-empresarial">Setor empresarial</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="ongs" name="segmento" value="ONG" checked={segmento === "ONG"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="ongs">ONG</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-religiosas" name="segmento" value="Entidade Religiosa" checked={segmento === "Entidade Religiosa"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="entidades-religiosas">Entidade Religiosa</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6  border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Anexos{" "}
              <span className="text-sm font-normal">
                (Limite máximo de 250mb)
              </span>
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div className="text-[20px] text-gray-700">
                Recomendamos que os documentos da candidatura sejam enviados no
                formato pasta compactada (Arquivo ZIP).{" "}
                <Link
                  href="https://eleicaocmpu2023.prefeitura.sp.gov.br/instrucoes-para-envio-da-documentacao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Clique aqui
                </Link>{" "}
                para instruções de como compactar os arquivos.
              </div>

              <div>
                <Label className="text-sm font-medium">
                </Label>
                <div className="mt-1">
                  <label
                    htmlFor="doc-candidato"
                    className="inline-block bg-[#808080] text-white py-[6px] px-[18px] text-xs font-bold leading-[18px] cursor-pointer hover:brightness-90 transition-all"
                  >
                    escolher arquivo
                  </label>
                  <Input
                    id="doc-candidato"
                    type="file"
                    accept=".zip"
                    required
                    onChange={(e) => e.target.files && setDocumentoCandidato(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                {documentoCandidato && <span className="text-xs text-gray-500 mt-1 block">Arquivo selecionado: {documentoCandidato.name}</span>}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="confirmo"
                  checked={confirmo}
                  onCheckedChange={(checked) => setConfirmo(checked as boolean)}
                  className=" border-foreground border-2"
                />
                <label htmlFor="confirmo" className="text-sm ">
                  Confirmo que as informações acima são verdadeiras
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6  border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Contato
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1 border-black border-2 h-[50px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label
                    htmlFor="confirme-email"
                    className="text-sm font-medium"
                  >
                    Confirme e-mail
                  </Label>
                  <Input
                    id="confirme-email"
                    type="email"
                    value={confirmeEmail}
                    onChange={(e) => setConfirmeEmail(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#6CBA74] hover:bg-green-600 text-white w-44 h-13 font-bold px-12 py-3 rounded-full text-lg"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
