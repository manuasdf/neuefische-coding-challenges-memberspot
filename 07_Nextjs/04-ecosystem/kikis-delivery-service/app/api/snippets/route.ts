import { getAllSnippets } from "@/lib/services/snippetsService";

export async function GET() {
  const snippets = await getAllSnippets();
  
  if (!snippets) 
    return Response.json({ error: "Snippets not found" }, { status: 404 }); 

  return Response.json(snippets);
}
