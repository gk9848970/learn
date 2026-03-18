import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const userTable = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: userRole("userRole").default("ADMIN").notNull(),
  },
  (table) => [
    uniqueIndex("emailIndex").on(table.email),
    unique("uniqueNameAndAge").on(table.name, table.age),
  ],
);

export const userPreferencesTable = pgTable("userPreferences", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").references(() => userTable.id).unique(),
  emailUpdates: boolean("emailUpdates").notNull().default(true),
});

export const postTable = pgTable("post", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("averageRating").notNull().default(2.5),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  authorId: integer("authorId").references(() => userTable.id),
});

export const categoryTable = pgTable("category", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull()
})

export const postCategoryTable = pgTable("postCategory", {
    postId: integer("postId").notNull().references(() => postTable.id),
    categoryId: integer("categoryId").notNull().references(() => categoryTable.id)
}, t => [
    primaryKey({  columns: [t.postId, t.categoryId]})
])