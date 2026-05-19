import { relations } from "drizzle-orm";
import {
  menuCategories,
  menuItems,
  orderItems,
  orders,
  orderStatusHistory,
  reservations,
  tables,
  user,
} from "./schema";

export const userRelations = relations(user, ({ many }) => ({
  assignOrders: many(orders),
  statusChanges: many(orderStatusHistory),
}));
export const categoriesRelations = relations(menuCategories, ({ many }) => ({
  item: many(menuCategories),
}));
export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  category: one(menuCategories, {
    fields: [menuItems.categoryId],
    references: [menuCategories.id],
  }),
  orderItems: many(orderItems),
}));
export const ordersRelations = relations(orders, ({ one, many }) => ({
  item: many(orderItems),
  driver: one(user, {
    fields: [orders.driverId],
    references: [user.id],
  }),
  statusHistory: many(orderStatusHistory),
}));
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  menuItem: one(menuItems, {
    fields: [orderItems.menuItemId],
    references: [menuItems.id],
  }),
}));
export const orderStatusHistoryRelations = relations(
  orderStatusHistory,
  ({ one }) => ({
    order: one(orders, {
      fields: [orderStatusHistory.orderId],
      references: [orders.id],
    }),
    changedByUser: one(user, {
      fields: [orderStatusHistory.changedBy],
      references: [user.id],
    }),
  }),
);
export const driverRelations = relations(user, ({ many }) => ({
  driverOrders: many(orders),
}));
export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(user, {
    fields: [reservations.userId],
    references: [user.id],
  }),
  table: one(tables, {
    fields: [reservations.tableId],
    references: [tables.id],
  }),
}));

export const tablesRelations = relations(tables, ({ many }) => ({
  reservations: many(reservations),
}));
