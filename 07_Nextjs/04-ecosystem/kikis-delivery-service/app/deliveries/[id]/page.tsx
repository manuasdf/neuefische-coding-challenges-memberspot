import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDeliveryById } from "@/lib/services/deliveriesService";
import Link from "next/link";

export default async function Page({params}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delivery = await getDeliveryById(id);
  
  return (
    <div>
      <h2>
        First delievery
      </h2>
      <Button variant="brand" render={<Link href="/deliveries" />} nativeButton={false}>Go back
    </Button>
          <Card key={delivery?.id}>
            <CardHeader>
              <CardTitle>{delivery?.status}</CardTitle>
            </CardHeader>
            <CardContent>
              Pickup: {delivery?.pickup} <br />
              Destination: {delivery?.destination} 
            </CardContent>
          </Card>

    </div>
  );
}
