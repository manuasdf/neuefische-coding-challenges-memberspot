import { addDelivery } from "@/app/actions";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function NewDeliveryPage() {
  return (
    <form action={addDelivery}>
      <Field>
        <FieldLabel htmlFor="pickup">Pickup</FieldLabel>
        <Input id="pickup" name="pickup" placeholder="Pickup" />
      </Field>
      <Field>
        <FieldLabel htmlFor="destination">Destination</FieldLabel>
      <Input id="destination" name="destination" placeholder="Destination" />
      </Field>
      <Button type="submit">Create request</Button>
    </form>
  );
}
