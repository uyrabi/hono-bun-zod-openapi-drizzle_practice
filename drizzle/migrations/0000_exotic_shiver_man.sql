CREATE TABLE `post` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`deleted_at` timestamp,
	`title` varchar(256) NOT NULL,
	`body` text NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`deleted_at` timestamp,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`username` varchar(256) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
