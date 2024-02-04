ALTER TABLE `post` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `post` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `password` varchar(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `username` varchar(16) NOT NULL;