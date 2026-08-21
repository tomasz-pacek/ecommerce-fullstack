import { cn } from "@/lib/utils";

type Props = {
  current: number;
  slidesLength: number;
  onSelect: (index: number) => void;
};

export default function HeroDots({ slidesLength, current, onSelect }: Props) {
  return (
    <div className="space-x-2">
      {Array.from({ length: slidesLength }).map((_, index) => (
        <button
          onClick={() => onSelect(index)}
          key={index}
          className={cn(
            "border-muted-foreground rounded-full border p-2.5",
            index === current && "border-foreground p-3",
          )}
        ></button>
      ))}
    </div>
  );
}
