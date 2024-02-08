import { pgTable, text } from "drizzle-orm/pg-core";

export const trips = pgTable("trips", {
  id: text("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  descriptionShort: text("description_short").notNull(),
  imageUrl: text("imageUrl").notNull(),
});
