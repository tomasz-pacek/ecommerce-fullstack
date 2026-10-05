import { z } from "zod";
import {
  brandEnum,
  cpuBrandEnum,
  gpuTypeEnum,
  storageTypeEnum,
  osEnum,
} from "@/db/schema";

const num = (msg = "Required. Enter a number") => z.number({ message: msg });

const optionalPositiveInt = z.number().int().positive().nullable();

export const laptopFormSchema = z.object({
  title: z.string().trim().min(3, "Min. 3 characters").max(200),
  brand: z.enum(brandEnum.enumValues),
  model: z.string().trim().min(1, "Required").max(120),
  description: z.string().max(5000).nullable(),
  priceCents: num().positive(),
  compareAtPriceCents: z.number().positive().nullable(),
  quantity: num().int("Must be a whole number").min(0, "Cannot be negative"),
  ramGb: num().int().positive().min(8, "Must be at least 8GB"),
  storageGb: num().int().positive().min(128, "Must be at least 128GB"),
  screenInches: z.string().max(10).nullable(),
  weightGrams: optionalPositiveInt,
  batteryWh: optionalPositiveInt,
  refreshRateHz: optionalPositiveInt,
  cpuBrand: z.enum(cpuBrandEnum.enumValues),
  cpuModel: z.string().trim().min(1, "Required").max(60),
  gpuType: z.enum(gpuTypeEnum.enumValues),
  gpuModel: z.string().max(60).nullable(),
  storageType: z.enum(storageTypeEnum.enumValues),
  os: z.enum(osEnum.enumValues),
  touchscreen: z.boolean(),
  backlitKeyboard: z.boolean(),
  isActive: z.boolean(),
});
