import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  pgEnum,
  varchar,
  uuid,
  integer,
  uniqueIndex,
  numeric,
} from "drizzle-orm/pg-core";

export const brandEnum = pgEnum("laptop_brand", [
  "apple",
  "dell",
  "lenovo",
  "asus",
  "hp",
  "msi",
  "acer",
]);

export const cpuBrandEnum = pgEnum("cpu_brand", ["intel", "amd", "apple"]);
export const gpuTypeEnum = pgEnum("gpu_type", ["integrated", "dedicated"]);
export const storageTypeEnum = pgEnum("storage_type", ["ssd", "hdd", "emmc"]);
export const osEnum = pgEnum("os", ["windows", "macos", "linux", "chrome_os"]);

export const cpuBrands = cpuBrandEnum.enumValues;
export type CpuBrandsType = (typeof cpuBrands)[number];

export const gpuTypes = gpuTypeEnum.enumValues;
export type GpuType = (typeof gpuTypes)[number];

export const storageTypes = storageTypeEnum.enumValues;
export type StorageType = (typeof storageTypes)[number];

export const operatingSystems = osEnum.enumValues;
export type OperatingSystemType = (typeof operatingSystems)[number];

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const laptops = pgTable(
  "laptops",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sku: varchar("sku", { length: 40 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    brand: brandEnum("brand").notNull(),
    model: varchar("model", { length: 120 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    priceCents: integer("price_cents").notNull(),
    compareAtPriceCents: integer("compare_at_price_cents"),
    currency: varchar("currency", { length: 3 }).default("PLN").notNull(),
    quantity: integer("quantity").default(0).notNull(),

    ramGb: integer("ram_gb").notNull(),
    storageGb: integer("storage_gb").notNull(),
    screenInches: numeric("screen_inches", { precision: 3, scale: 1 }),
    weightGrams: integer("weight_grams"),
    batteryWh: integer("battery_wh"),
    refreshRateHz: integer("refresh_rate_hz"),

    cpuBrand: cpuBrandEnum("cpu_brand").notNull(),
    cpuModel: varchar("cpu_model", { length: 60 }),
    gpuType: gpuTypeEnum("gpu_type").notNull(),
    gpuModel: varchar("gpu_model", { length: 60 }),
    storageType: storageTypeEnum("storage_type").notNull(),
    os: osEnum("os").notNull(),

    touchscreen: boolean("touchscreen").default(false).notNull(),
    backlitKeyboard: boolean("backlit_keyboard").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("laptops_sku_idx").on(t.sku),
    uniqueIndex("laptops_slug_idx").on(t.slug),
    index("laptops_brand_idx").on(t.brand),
    index("laptops_price_idx").on(t.priceCents),
    index("laptops_ram_idx").on(t.ramGb),
    index("laptops_quantity_idx").on(t.quantity),
  ],
);

export const laptopImages = pgTable(
  "laptop_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    laptopId: uuid("laptop_id")
      .notNull()
      .references(() => laptops.id, { onDelete: "cascade" }),
    publicId: varchar("public_id", { length: 500 }).notNull(),
    alt: varchar("alt", { length: 200 }),
    position: integer("position").default(0).notNull(), // kolejność wyświetlania
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("laptop_images_laptop_id_idx").on(t.laptopId)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const laptopRelations = relations(laptops, ({ many }) => ({
  images: many(laptopImages),
}));

export const laptopImageRelations = relations(laptopImages, ({ one }) => ({
  laptop: one(laptops, {
    fields: [laptopImages.laptopId],
    references: [laptops.id],
  }),
}));

export type Laptop = typeof laptops.$inferSelect;
