import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";

export default async function Page() {
  const snippets = await getAllSnippets();
  return (
    <div>
      <h2>
        Get all snippets
      </h2>

      {snippets.map((snippet) => (
          <Card key={snippet.id} className="m-3">
            <Link href={`/snippets/${snippet.id}`}>
                <CardHeader>
                  <CardTitle>{snippet.title}</CardTitle>
                </CardHeader>
            </Link>
            <CardContent>
              <p>{snippet.description}</p>
            <FavoriteButton snippetId={snippet.id} />
            </CardContent>
          </Card>
        ))}

    </div>
  );
}
