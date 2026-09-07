import { getDeliveryById } from "@/lib/services/deliveriesService";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;
  const delievery = typeof id === "string" ? getDeliveryById(id) : undefined;
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
