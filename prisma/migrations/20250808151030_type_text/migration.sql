-- AlterTable
ALTER TABLE `arquivos` MODIFY `caminho` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `inscricao` MODIFY `nomeChapa` TEXT NULL,
    MODIFY `nomeEntidade` TEXT NOT NULL,
    MODIFY `segmento` TEXT NOT NULL,
    MODIFY `nome` TEXT NOT NULL,
    MODIFY `email` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `nome` TEXT NOT NULL;
