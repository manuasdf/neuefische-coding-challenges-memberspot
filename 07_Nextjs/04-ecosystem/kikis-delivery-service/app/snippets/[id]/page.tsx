import { getSnippetById } from "@/lib/services/snippetsService";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";

export default async function Page({params}: PageProps<"/snippets/[id]">) {
  const { id } = await params;
  const snippet = await getSnippetById(id);
  return (
    <div>
      <h2>
        One snippet
      </h2>
      <Link href={`/snippets`}>Go back</Link>

      <Card key={snippet?.id} className="m-3">
        <CardHeader>
          <CardTitle>{snippet?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{snippet?.description}</p>
          <pre>
            <code>
              {snippet?.code} 
            </code>
          </pre>
          <FavoriteButton snippetId={snippet?.id} />
        </CardContent>
      </Card>

    </div>
  );
}
