CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `subcategories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
