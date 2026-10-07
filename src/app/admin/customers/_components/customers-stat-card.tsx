import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function CustomersStatCard({ title, children }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col items-start justify-center gap-2">
        <p className="text-muted-foreground text-xs">{title}</p>
        {children}
      </CardContent>
    </Card>
  );
}
