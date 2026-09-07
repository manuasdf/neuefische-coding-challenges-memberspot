import { getAllDeliveries } from "@/lib/services/deliveriesService";
import Link from "next/link";

export default function Page() {
  const delieveries = getAllDeliveries();
  return (
    <div>
      <h2>
        Get all delieveries
      </h2>
      <ul>
        {delieveries.map((delivery) => (
            <li key={delivery.id}>
              <Link href={`/deliveries/${delivery.id}`}>
                  Pickup: {delivery.pickup} 
                  Destination: {delivery.destination} 
                  Status: {delivery.status} 
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
