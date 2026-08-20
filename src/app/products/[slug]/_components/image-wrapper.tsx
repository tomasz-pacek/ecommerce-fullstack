"use client";

import { CldImage } from "next-cloudinary";

export default function ImageWrapper() {
  return (
    <CldImage
      loading="eager"
      src="mamitek_profilowe"
      width={600}
      height={600}
      alt="mamitek"
      className="rounded-xl"
    />
  );
}
