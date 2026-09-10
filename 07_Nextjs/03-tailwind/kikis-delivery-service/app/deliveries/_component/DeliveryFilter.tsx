"use client";

import { useState } from "react";
import type { DeliveryRequest } from "@/lib/services/deliveriesService";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

export default function DeliveryFilter({
  deliveries,
}: {
  deliveries: DeliveryRequest[];
}) {
  const [status, setStatus] = useState("all");

  const visible =
    status === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === status);

      const items = [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Accepted", value: "accepted" },
        { label: "Fulfilled", value: "fulfilled" },
      ];
  return (
    <div>

      <Select items={items} onValueChange={setStatus} defaultValue={items[0].value}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {visible.map((delivery) => (
        <Link href={`/deliveries/${delivery.id}`}>
          <Card key={delivery.id}>
            <CardHeader>
              <CardTitle>{delivery.status}</CardTitle>
            </CardHeader>
            <CardContent>
              Pickup: {delivery.pickup} <br />
              Destination: {delivery.destination} 
            </CardContent>
          </Card>
        </Link>
        ))}
    </div>
  );
}
