"use client";

import { CldImage } from "next-cloudinary";

export default function Test() {
  return (
    <CldImage
      src="mamitek_profilowe"
      width={600}
      height={600}
      alt="mamitek"
      className="rounded-xl"
    />
  );
}
