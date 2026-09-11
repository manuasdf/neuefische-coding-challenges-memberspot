"use server";

import { createDelivery } from "@/lib/services/deliveriesService";
import { createSnippet, getSnippetById, FormSnippet, Snippet } from "@/lib/services/snippetsService";
import { revalidatePath } from "next/cache";

export type { Snippet };

export async function addDelivery(formData: FormData) {

    const pickup = formData.get("pickup") as string;
    const destination = formData.get("destination") as string;

    await createDelivery({ pickup, destination });
    revalidatePath("/deliveries");
}

export async function addSnippet(formData: FormSnippet) {

    // const title = formData.get("title") as string;
    // const language = formData.get("language") as string;
    // const description = formData.get("description") as string;
    // const code = formData.get("code") as string;

    // await createSnippet({ title, language, description, code });
    await createSnippet(formData);
    revalidatePath("/snippets");
}

export async function getFavoriteSnippets(snippetIds: number[]): Promise<Snippet[]> {
  const snippets = await Promise.all(
    snippetIds.map((id) => getSnippetById(id.toString()))
  );
  return snippets.filter(Boolean) as Snippet[];
}

