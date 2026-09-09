import { sql } from "@/lib/db";

export type DeliveryStatus = "active" | "accepted" | "denied" | "fulfilled";

export type DeliveryRequest = {
  id: string;
  pickup: string;
  destination: string;
  status: DeliveryStatus;
};

export async function getAllDeliveries(): Promise<DeliveryRequest[]> {
  return await sql<DeliveryRequest[]>`SELECT * FROM deliveries`;
}

export async function getDeliveryById(
  id: string,
): Promise<DeliveryRequest | null> {
  const [delivery] = await sql<DeliveryRequest[]>`
    SELECT * FROM deliveries WHERE id = ${id}
  `;
  return delivery ?? null;
}

export async function createDelivery(options: Pick<DeliveryRequest, "pickup" | "destination">) {
  await sql<DeliveryRequest[]>`
    INSERT INTO deliveries (pickup, destination)
    VALUES (${options.pickup}, ${options.destination})
  `;
  return;
}
