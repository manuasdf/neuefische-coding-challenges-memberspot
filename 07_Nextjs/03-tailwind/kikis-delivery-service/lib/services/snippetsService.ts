import { sql } from "@/lib/db";

export type Snippet = {
  id: number;
  title: string;
  language: string;
  description: string;
  code: string;
};

export async function getAllSnippets(): Promise<Snippet[]> {
  return await sql<Snippet[]>`SELECT * FROM snippets`;
}

export async function getSnippetById(
  id: string,
): Promise<Snippet | null> {
  const [snippet] = await sql<Snippet[]>`
    SELECT * FROM snippets WHERE id = ${id}
  `;
  return snippet ?? null;
}
