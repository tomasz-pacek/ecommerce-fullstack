"use client";
import RHFField from "@/components/shared/rhf-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  brands,
  cpuBrands,
  gpuTypes,
  operatingSystems,
  storageTypes,
} from "@/db/schema";
import { laptopFormSchema } from "@/lib/validations/laptop-form-schema";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof laptopFormSchema>>;
};

export default function LaptopFormFields({ form }: Props) {
  return (
    <Accordion defaultValue={["listing"]} multiple>
      <AccordionItem value="listing">
        <AccordionTrigger>LISTING</AccordionTrigger>
        <AccordionContent className="grid w-full grid-cols-2 gap-4 px-1">
          <RHFField
            className="col-span-2"
            form={form}
            name="title"
            label="Title*"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="MacBook Pro 14' M3 Pro 18GB/512GB Space Black"
              />
            )}
          </RHFField>
          <RHFField form={form} name="brand" label="Brand*">
            {(field) => (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="Brand" className="capitalize" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectGroup>
                    {brands.map((brand) => (
                      <SelectItem
                        key={brand}
                        value={brand}
                        className="capitalize"
                      >
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </RHFField>
          <RHFField form={form} name="model" label="Model*">
            {(field) => <Input {...field} placeholder="MacBook Pro 14" />}
          </RHFField>
          <RHFField
            form={form}
            name="description"
            label="Description"
            className="col-span-2"
          >
            {(field) => <Textarea {...field} value={field.value ?? ""} />}
          </RHFField>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price-and-stock">
        <AccordionTrigger>PRICING & STOCK</AccordionTrigger>
        <AccordionContent className="grid w-full grid-cols-3 gap-4 px-1">
          <RHFField form={form} name="priceCents" label="Price (PLN)*">
            {(field) => (
              <Input
                {...field}
                type="number"
                value={field.value / 100}
                placeholder="2137"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? undefined : Number(value) * 100,
                  );
                }}
              />
            )}
          </RHFField>

          <RHFField form={form} name="compareAtPriceCents" label="Compare at">
            {(field) => (
              <Input
                {...field}
                type="number"
                placeholder="2000"

                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} name="quantity" label="Quantity*">
            {(field) => (
              <Input
                {...field}
                type="number"
                placeholder="50"
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} name="isActive" className="col-span-3">
            {(field) => (
              <div className="border-input flex w-full items-center justify-between rounded-lg border px-4 py-2">
                <span>
                  Controls the isActive value if the item is visible on website
                </span>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          </RHFField>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="configuration">
        <AccordionTrigger>CONFIGURATION</AccordionTrigger>
        <AccordionContent className="grid w-full grid-cols-2 gap-4 px-1">
          <RHFField form={form} label="RAM (GB)*" name="ramGb">
            {(field) => (
              <Input
                {...field}
                type="number"
                placeholder="16"
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} label="Storage (GB)*" name="storageGb">
            {(field) => (
              <Input
                {...field}
                type="number"
                value={field.value ?? ""}
                placeholder="1024"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? undefined : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} label="CPU Brand*" name="cpuBrand">
            {(field) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="CPU Brand" className="capitalize" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectGroup>
                    {cpuBrands.map((brand) => (
                      <SelectItem
                        key={brand}
                        value={brand}
                        className="capitalize"
                      >
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </RHFField>
          <RHFField form={form} label="CPU model*" name="cpuModel">
            {(field) => (
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Apple M3"
              />
            )}
          </RHFField>
          <RHFField form={form} label="GPU type" name="gpuType">
            {(field) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="CPU Brand" className="capitalize" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectGroup>
                    {gpuTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </RHFField>
          <RHFField form={form} label="GPU model" name="gpuModel">
            {(field) => <Input {...field} value={field.value ?? ""} />}
          </RHFField>
          <RHFField form={form} label="Storage type" name="storageType">
            {(field) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="CPU Brand" className="uppercase" />
                </SelectTrigger>
                <SelectContent className="uppercase">
                  <SelectGroup>
                    {storageTypes.map((type) => (
                      <SelectItem key={type} value={type} className="uppercase">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </RHFField>
          <RHFField form={form} label="Operating system" name="os">
            {(field) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="CPU Brand" className="capitalize" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectGroup>
                    {operatingSystems.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </RHFField>
          <RHFField form={form} label='Screen (")' name="screenInches">
            {(field) => (
              <Input {...field} value={field.value ?? ""} placeholder="13.6" />
            )}
          </RHFField>
          <RHFField form={form} label="Refresh rate (Hz)" name="refreshRateHz">
            {(field) => (
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                placeholder="120"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} label="Weight (g)" name="weightGrams">
            {(field) => (
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                placeholder="1000"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} label="Battery (Wh)" name="batteryWh">
            {(field) => (
              <Input
                {...field}
                type="number"
                value={field.value ?? ""}
                placeholder="2000"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : Number(value));
                }}
              />
            )}
          </RHFField>
          <RHFField form={form} name="touchscreen">
            {(field) => (
              <div className="border-input flex w-full items-center justify-between rounded-lg border px-4 py-2">
                <span className="font-medium">Touchscreen</span>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          </RHFField>
          <RHFField form={form} name="backlitKeyboard">
            {(field) => (
              <div className="border-input flex w-full items-center justify-between rounded-lg border px-4 py-2">
                <span className="font-medium">Backlit keyboard</span>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          </RHFField>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
