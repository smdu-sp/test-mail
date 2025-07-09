export interface IInscricaoDto {
    nomeChapa?: string | null;
    nomeEntidade: string;
    segmento: string;
    is_chapa: boolean;
    nome: string;
    email: string;
    arquivo?: File;
}