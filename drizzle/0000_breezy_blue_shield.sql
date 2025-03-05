CREATE TABLE `register` (
	`id` varchar(36) NOT NULL,
	`name` varchar(36) NOT NULL,
	`email` varchar(36) NOT NULL,
	CONSTRAINT `register_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_map` UNIQUE(`name`,`email`)
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
	CONSTRAINT `student_id` PRIMARY KEY(`id`),
	CONSTRAINT `student_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `teacher` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `teacher_id` PRIMARY KEY(`id`),
	CONSTRAINT `teacher_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `register` ADD CONSTRAINT `register_name_student_id_fk` FOREIGN KEY (`name`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `register` ADD CONSTRAINT `register_email_teacher_id_fk` FOREIGN KEY (`email`) REFERENCES `teacher`(`id`) ON DELETE no action ON UPDATE no action;