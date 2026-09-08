import { getAllDeliveries } from "@/lib/services/deliveriesService";
import DeliveryFilter from "./_component/DeliveryFilter";

export default function Page() {
  const delieveries = getAllDeliveries();
  return (
    <div>
      <h2>
        Get all delieveries
      </h2>
      <DeliveryFilter delieveries={delieveries} />
    </div>
  );
}
