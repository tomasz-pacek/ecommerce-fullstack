import { getTotalUsersCount, getTotalVerifiedUsers } from "@/db/queries";
import CustomersStatCard from "./customers-stat-card";

export default async function CustomersStats() {
  const [totalUsers, totalVerifiedUsers] = await Promise.all([
    getTotalUsersCount(),
    getTotalVerifiedUsers(),
  ]);
  return (
    <div className="mb-6 grid w-full grid-cols-2 gap-6">
      <CustomersStatCard title="Accounts">
        <p className="text-foreground text-bold text-2xl">{totalUsers}</p>
      </CustomersStatCard>
      <CustomersStatCard title="Email verified">
        <p className="text-foreground text-bold text-2xl">
          {totalUsers}{" "}
          <span className="text-muted-foreground">/ {totalVerifiedUsers}</span>
        </p>
      </CustomersStatCard>
    </div>
  );
}
