import { Card, CardContent } from "@/components/ui/card";
import SelectSort from "./select-sort";

type Props = {
  total: number;
};

export default function GridTab({ total }: Props) {
  return (
    <Card className="bg-background p-3 text-sm">
      <CardContent className="flex flex-row items-center justify-between">
        <div>
          <p>Products ({total}) </p>
        </div>

        <SelectSort />
      </CardContent>
    </Card>
  );
}
