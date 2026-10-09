import { getCustomersForAdminPanel } from "@/db/queries";
import { CustomersDataTable } from "./customers-data-table";
import CustomersStats from "./customers-stats";
import { customerColumns } from "./customers-columns";

export default async function CustomersContent() {
  const customers = await getCustomersForAdminPanel();
  return (
    <div className="xs:px-0 container mx-auto px-4 py-12">
      <CustomersStats />
      <CustomersDataTable columns={customerColumns} data={customers} />
    </div>
  );
}
