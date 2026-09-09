import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function Page() {
  const snippets = await getAllSnippets();
  return (
    <div>
      <h2>
        Get all snippets
      </h2>
      <ul>
        {snippets.map((snippet) => (
            <li key={snippet.id}>
              <Link href={`/snippets/${snippet.id}`}>
                  <h3>{snippet.title}</h3>
                  <p>{snippet.description}</p>
                  <pre>
                    <code>
                      {snippet.code} 
                    </code>
                  </pre>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
