import { getDeliveryById } from "@/lib/services/deliveriesService";

export default function Page() {
  const delievery = getDeliveryById("0");
  return (
    <div>
      <h1>
        First delievery
      </h1>
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
