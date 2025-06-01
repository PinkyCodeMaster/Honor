DROP TABLE `subcategories`;--> statement-breakpoint
ALTER TABLE `categories` ADD `handle` text NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `is_active` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `is_internal` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `rank` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `parent_category_id` integer;--> statement-breakpoint
ALTER TABLE `categories` ADD `metadata` text;--> statement-breakpoint
ALTER TABLE `categories` ADD `deleted_at` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_handle_unique` ON `categories` (`handle`);