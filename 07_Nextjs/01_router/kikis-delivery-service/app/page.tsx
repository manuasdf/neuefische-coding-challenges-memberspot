import { getDeliveryById } from "@/lib/services/deliveriesService";

export default function Page() {
  const delievery = getDeliveryById("1");
  return (
    <div>
      <h2>
        First delievery
      </h2>
      <ul>
        <li key={delievery?.id}>
          Pickup: {delievery?.pickup} 
          Destination: {delievery?.destination} 
          Status: {delievery?.status} 
        </li>
      </ul>
    </div>
  );
}
