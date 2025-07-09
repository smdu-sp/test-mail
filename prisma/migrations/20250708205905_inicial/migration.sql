-- CreateTable
CREATE TABLE `inscricao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeChapa` VARCHAR(191) NULL,
    `nomeEntidade` VARCHAR(191) NOT NULL,
    `segmento` VARCHAR(191) NOT NULL,
    `is_chapa` BOOLEAN NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `protocolo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `inscricao_protocolo_key`(`protocolo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arquivos` (
    `id` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `inscricaoId` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `arquivos_inscricaoId_key`(`inscricaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_inscricaoId_fkey` FOREIGN KEY (`inscricaoId`) REFERENCES `inscricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
