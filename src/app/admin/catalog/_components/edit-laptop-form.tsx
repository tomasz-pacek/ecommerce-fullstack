"use client";

import { updateLaptop } from "@/actions/admin-catalog";

import { toast } from "@/components/ui/toast";
import { Laptop } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LaptopFormFields from "./laptop-form-fields";
import { laptopFormSchema } from "@/lib/validations/laptop-form-schema";

type Props = {
  laptop: Laptop;
  startTransition: React.TransitionStartFunction;
  onSuccess: () => void;
};

export default function EditLaptopForm({
  laptop,
  startTransition,
  onSuccess,
}: Props) {
  const {
    model,
    title,
    description,
    priceCents,
    compareAtPriceCents,
    quantity,
    ramGb,
    brand,
    storageGb,
    storageType,
    screenInches,
    weightGrams,
    batteryWh,
    refreshRateHz,
    cpuBrand,
    cpuModel,
    gpuType,
    gpuModel,
    os,
    touchscreen,
    backlitKeyboard,
    isActive,
  } = laptop;
  const form = useForm<z.infer<typeof laptopFormSchema>>({
    resolver: zodResolver(laptopFormSchema),
    defaultValues: {
      model,
      title,
      description,
      priceCents,
      compareAtPriceCents,
      quantity,
      ramGb,
      brand,
      storageGb,
      storageType,
      screenInches,
      weightGrams,
      batteryWh,
      refreshRateHz,
      cpuBrand,
      cpuModel,
      gpuType,
      gpuModel,
      os,
      touchscreen,
      backlitKeyboard,
      isActive,
    },
  });

  const onSubmit = async (data: z.infer<typeof laptopFormSchema>) => {
    startTransition(async () => {
      const result = await updateLaptop(data, laptop.id, laptop.slug);
      if (result.success) {
        onSuccess();
        toast.add({ title: "You have updated the laptop", type: "success" });
      } else {
        toast.add({
          title: result.error || "Something went wrong",
          type: "error",
        });
      }
    });
  };

  return (
    <form
      id="edit-laptop-form"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("VALIDATION ERRORS:", errors);
      })}
      className="px-4"
    >
      <LaptopFormFields form={form} />
    </form>
  );
}
