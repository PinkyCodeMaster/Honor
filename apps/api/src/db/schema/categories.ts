import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// === Categories ===
export const categories = sqliteTable("categories", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
    handle: text("handle").notNull().unique(), // URL slug
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    isInternal: integer("is_internal", { mode: "boolean" }).notNull().default(false),
    rank: integer("rank").notNull().default(0),
    parentCategoryId: integer("parent_category_id", { mode: "number" }), // nullable
    metadata: text("metadata"), // Can store JSON.stringified value
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

// === Drizzle-Zod Schemas ===
export const selectCategorySchema = createSelectSchema(categories);

export const insertCategorySchema = createInsertSchema(categories, {
    name: (s) => s.name.min(1).max(255),
    handle: (s) => s.handle.min(1).max(255),
}).required({
    name: true,
    handle: true,
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export const patchCategorySchema = insertCategorySchema.partial();
