-- CreateTable
CREATE TABLE `StudentExam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `examName` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `score` INTEGER NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NULL,
    `answers` JSON NULL,

    UNIQUE INDEX `StudentExam_id_key`(`id`),
    PRIMARY KEY (`userId`, `examId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentExam` ADD CONSTRAINT `StudentExam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
