type Props = {
  value: string;
  label: string;
};

export function Stat({ value, label }: Props) {
  return (
    <div>
      <dt className="text-2xl font-semibold">{value}</dt>
      <dd className="text-muted-foreground mt-1 font-mono text-[10px] tracking-[0.15em] uppercase">
        {label}
      </dd>
    </div>
  );
}
