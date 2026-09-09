import { getAllDeliveries } from "@/lib/services/deliveriesService";
import DeliveryFilter from "./_component/DeliveryFilter";

export default async function Page() {
  const delieveries = await getAllDeliveries();
  console.log(delieveries);
  return (
    <div>
      <h2>
        Get all delieveries
      </h2>
      <DeliveryFilter deliveries={delieveries} />
    </div>
  );
}
