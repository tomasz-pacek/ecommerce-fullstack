"use client";
import LogoLoop from "@/components/LogoLoop";
import {
  SiApple,
  SiDell,
  SiLenovo,
  SiAsus,
  SiHp,
  SiMsi,
  SiAcer,
} from "react-icons/si";

const logos = [
  { node: <SiApple />, title: "Apple", href: "https://www.apple.com" },
  { node: <SiDell />, title: "Dell", href: "https://www.dell.com" },
  {
    node: <SiLenovo />,
    title: "Lenovo",
    href: "https://www.lenovo.com",
  },
  { node: <SiAsus />, title: "Asus", href: "https://www.asus.com" },
  { node: <SiHp />, title: "HP", href: "https://www.hp.com" },
  { node: <SiMsi />, title: "MSI", href: "https://www.msi.com" },
  { node: <SiAcer />, title: "Acer", href: "https://www.acer.com" },
];

export default function LogosSection() {
  return (
    <div className="py-10">
      <LogoLoop
        logos={logos}
        speed={90}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={20}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
