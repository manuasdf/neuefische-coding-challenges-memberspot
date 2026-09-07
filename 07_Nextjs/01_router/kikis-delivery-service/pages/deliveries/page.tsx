import { getAllDeliveries } from "@/lib/services/deliveriesService";

export default function Page() {
  const delieveries = getAllDeliveries();
  return (
    <div>
      <h1>
        Get all delieveries
      </h1>
      <ul>
        {delieveries.map((delievery) => (
            <li key={delievery.id}>
              Pickup: {delievery.pickup} 
              Destination: {delievery.destination} 
              Status: {delievery.status} 
            </li>
          ))}
      </ul>
    </div>
  );
}
