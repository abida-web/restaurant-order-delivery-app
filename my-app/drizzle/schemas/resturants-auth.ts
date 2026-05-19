import {
  boolean,
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Define enums FIRST (before they are used)
export const statusEnum = pgEnum("order_status", [
  "pending",
  "preparing",
  "out_for_delivery",
  "ready",
  "delivered",
  "completed",
  "cancelled",
]);

export const typeEnum = pgEnum("order_type", [
  "dine-in",
  "takeaway",
  "delivery",
]);

export const paymentMethodEnum = pgEnum("payment_method", ["cash", "card"]);

export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid"]);

// Tables
export const menuCategories = pgTable("menu_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url"),
  isAvaliable: boolean("is_avaliable").default(true),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => menuCategories.id, { onDelete: "cascade" }),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  type: typeEnum("type").notNull(),
  status: statusEnum("status").default("pending").notNull(),
  totalAmount: numeric("total_amount").notNull(),
  paymentMethod: paymentMethodEnum("payment_method").default("card"),
  userId: text("user_id").references(() => user.id),
  paymentStatus: paymentStatusEnum("payment_status").default("pending"),
  driverId: text("driver_id").references(() => user.id, {
    onDelete: "set null",
  }), // Changed to text to match user.id
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  menuItemId: uuid("menu_item_id").references(() => menuItems.id, {
    onDelete: "set null",
  }),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderStatusHistory = pgTable("order_status_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  status: text("status").notNull(),
  changedBy: text("changed_by").references(() => user.id, {
    onDelete: "set null",
  }), // Changed to text to match user.id
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const tables = pgTable("tables", {
  id: uuid("id").defaultRandom().primaryKey(),
  tableNumber: text("table_number").notNull().unique(),
  capacity: integer("capacity").notNull(),
  location: text("location"),
  status: text("status").default("available"),
});
export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  tableId: uuid("tableId").references(() => tables.id),
  userId: text("user_id").references(() => user.id),
  numberOfPeople: integer("number_of_people").notNull(),
  reservationDate: date("reservation_date").notNull(),
  reservationTime: time("reservation_time").notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const newsLetter = pgTable("newsLetter", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  restaurantName: text("restaurant_name"),
  phone: text("phone"),
  address: text("address"),
  currency: text("currency"),
  createdAt: timestamp("created_at").defaultNow(),
});
