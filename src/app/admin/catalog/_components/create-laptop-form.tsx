"use client";

import { toast } from "@/components/ui/toast";
import { laptopFormSchema } from "@/lib/validations/laptop-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LaptopFormFields from "./laptop-form-fields";
import { useLaptopActions } from "../_contexts/laptop-actions-context";
import { createLaptop } from "@/actions/admin-catalog";

type Props = {
  startTransition: React.TransitionStartFunction;
};

export default function CreateLaptopForm({ startTransition }: Props) {
  const { setIsCreateLaptopSheetOpen } = useLaptopActions();
  const form = useForm<z.infer<typeof laptopFormSchema>>({
    resolver: zodResolver(laptopFormSchema),
    defaultValues: {
      model: "",
      title: "",
      description: null,
      priceCents: undefined,
      compareAtPriceCents: null,
      quantity: undefined,
      ramGb: undefined,
      brand: "apple",
      storageGb: undefined,
      storageType: "ssd",
      screenInches: null,
      weightGrams: null,
      batteryWh: null,
      refreshRateHz: null,
      cpuBrand: "apple",
      cpuModel: "",
      gpuType: "integrated",
      gpuModel: "",
      os: "macos",
      touchscreen: false,
      backlitKeyboard: false,
      isActive: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof laptopFormSchema>) => {
    startTransition(async () => {
      const result = await createLaptop(data);
      if (result.success) {
        setIsCreateLaptopSheetOpen(false);
        toast.add({
          title: "You have created new laptop",
          type: "success",
        });
      } else {
        setIsCreateLaptopSheetOpen(false);
        toast.add({
          title: result.error || "Something went wrong",
          type: "error",
        });
      }
    });
  };

  return (
    <form
      id="create-laptop-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="px-4"
    >
      <LaptopFormFields form={form} />
    </form>
  );
}
