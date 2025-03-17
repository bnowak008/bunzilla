import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Define the todos table
export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Define types for our schema
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert; 