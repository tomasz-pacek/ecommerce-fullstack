CREATE TYPE "public"."laptop_brand" AS ENUM('apple', 'dell', 'lenovo', 'asus', 'hp', 'msi', 'acer');--> statement-breakpoint
CREATE TYPE "public"."cpu_brand" AS ENUM('intel', 'amd', 'apple');--> statement-breakpoint
CREATE TYPE "public"."gpu_type" AS ENUM('integrated', 'dedicated');--> statement-breakpoint
CREATE TYPE "public"."os" AS ENUM('windows', 'macos', 'linux', 'chrome_os');--> statement-breakpoint
CREATE TYPE "public"."storage_type" AS ENUM('ssd', 'hdd', 'emmc');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"guest_id" text,
	"laptop_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "laptop_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"laptop_id" uuid NOT NULL,
	"public_id" varchar(500) NOT NULL,
	"alt" varchar(200),
	"position" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "laptops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" varchar(40) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"brand" "laptop_brand" NOT NULL,
	"model" varchar(120) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"price_cents" integer NOT NULL,
	"compare_at_price_cents" integer,
	"currency" varchar(3) DEFAULT 'PLN' NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"ram_gb" integer NOT NULL,
	"storage_gb" integer NOT NULL,
	"screen_inches" numeric(3, 1),
	"weight_grams" integer,
	"battery_wh" integer,
	"refresh_rate_hz" integer,
	"cpu_brand" "cpu_brand" NOT NULL,
	"cpu_model" varchar(60),
	"gpu_type" "gpu_type" NOT NULL,
	"gpu_model" varchar(60),
	"storage_type" "storage_type" NOT NULL,
	"os" "os" NOT NULL,
	"touchscreen" boolean DEFAULT false NOT NULL,
	"backlit_keyboard" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"stripe_checkout_session_id" text NOT NULL,
	"stripe_payment_intent_id" text,
	"product_id" text,
	"amount" integer,
	"currency" text DEFAULT 'usd',
	"status" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "purchases_stripe_checkout_session_id_unique" UNIQUE("stripe_checkout_session_id")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripe_customer_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role";--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_laptop_id_laptops_id_fk" FOREIGN KEY ("laptop_id") REFERENCES "public"."laptops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptop_images" ADD CONSTRAINT "laptop_images_laptop_id_laptops_id_fk" FOREIGN KEY ("laptop_id") REFERENCES "public"."laptops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "cart_items_user_laptop_idx" ON "cart_items" USING btree ("user_id","laptop_id");--> statement-breakpoint
CREATE UNIQUE INDEX "cart_items_guest_laptop_idx" ON "cart_items" USING btree ("guest_id","laptop_id");--> statement-breakpoint
CREATE INDEX "cart_items_user_id_idx" ON "cart_items" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "cart_items_guest_id_idx" ON "cart_items" USING btree ("guest_id");--> statement-breakpoint
CREATE INDEX "laptop_images_laptop_id_idx" ON "laptop_images" USING btree ("laptop_id");--> statement-breakpoint
CREATE UNIQUE INDEX "laptops_sku_idx" ON "laptops" USING btree ("sku");--> statement-breakpoint
CREATE UNIQUE INDEX "laptops_slug_idx" ON "laptops" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "laptops_brand_idx" ON "laptops" USING btree ("brand");--> statement-breakpoint
CREATE INDEX "laptops_price_idx" ON "laptops" USING btree ("price_cents");--> statement-breakpoint
CREATE INDEX "laptops_ram_idx" ON "laptops" USING btree ("ram_gb");--> statement-breakpoint
CREATE INDEX "laptops_quantity_idx" ON "laptops" USING btree ("quantity");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_stripe_customer_id_unique" UNIQUE("stripe_customer_id");