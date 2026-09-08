export type DeliveryStatus = "active" | "accepted" | "denied" | "fulfilled";

export type DeliveryRequest = {
  id: string;
  pickup: string;
  destination: string;
  status: DeliveryStatus;
};

const deliveries: DeliveryRequest[] = [
  { id: "1", pickup: "Bakery", destination: "Clock Tower", status: "active" },
  {
    id: "2",
    pickup: "Harbour",
    destination: "Hillside Cafe",
    status: "accepted",
  },
  { id: "3", pickup: "Bookshop", destination: "Lighthouse", status: "denied" },
  {
    id: "4",
    pickup: "Market Square",
    destination: "Train Station",
    status: "fulfilled",
  },
];

export function getAllDeliveries(): DeliveryRequest[] {
  return deliveries;
}

export function getDeliveryById(id: string): DeliveryRequest | null {
  return deliveries.find((d) => d.id === id) || null;
}

export function createDelivery(options: Pick<DeliveryRequest, "pickup" | "destination">) {
  const newDelivery = {
    id: (Number(deliveries[deliveries.length-1].id)+1).toString(),
    pickup: options.pickup,
    destination: options.destination,
    status: "active" as DeliveryStatus
  } as DeliveryRequest;
  deliveries.push(newDelivery);
  return newDelivery
}
