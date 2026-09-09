import { getDeliveryById } from "@/lib/services/deliveriesService";
import Link from "next/link";

export default async function Page({params}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delievery = await getDeliveryById(id);
  
  return (
    <div>
      <h2>
        First delievery
      </h2>
      <Link href={`/deliveries`}>Go back</Link>
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
