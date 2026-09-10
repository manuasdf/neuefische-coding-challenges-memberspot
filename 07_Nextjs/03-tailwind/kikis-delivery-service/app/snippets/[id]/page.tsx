import { getSnippetById } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function Page({params}: PageProps<"/snippets/[id]">) {
  const { id } = await params;
  const snippet = await getSnippetById(id);
  return (
    <div>
      <h2>
        One snippet
      </h2>
      <Link href={`/snippets`}>Go back</Link>
      <ul>
            <li>
                  <h3>{snippet.title}</h3>
                  <p>{snippet.description}</p>
                  <pre>
                    <code>
                      {snippet.code} 
                    </code>
                  </pre>
            </li>
      </ul>
    </div>
  );
}
