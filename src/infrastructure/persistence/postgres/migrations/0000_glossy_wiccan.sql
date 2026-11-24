CREATE TABLE "fleet_vehicles" (
	"fleet_id" text NOT NULL,
	"vehicle_id" text NOT NULL,
	CONSTRAINT "fleet_vehicles_fleet_id_vehicle_id_pk" PRIMARY KEY("fleet_id","vehicle_id")
);
--> statement-breakpoint
CREATE TABLE "fleets" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" text PRIMARY KEY NOT NULL,
	"latitude" double precision,
	"longitude" double precision
);
--> statement-breakpoint
ALTER TABLE "fleet_vehicles" ADD CONSTRAINT "fleet_vehicles_fleet_id_fleets_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet_vehicles" ADD CONSTRAINT "fleet_vehicles_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;