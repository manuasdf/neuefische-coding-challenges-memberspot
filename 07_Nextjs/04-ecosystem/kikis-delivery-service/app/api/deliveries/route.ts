import { getAllDeliveries } from "@/lib/services/deliveriesService";

export async function GET() {
  const deliveries = await getAllDeliveries();
  
  if (!deliveries) 
    return Response.json({ error: "Deliveries not found" }, { status: 404 }); 

  return Response.json(deliveries);
}
