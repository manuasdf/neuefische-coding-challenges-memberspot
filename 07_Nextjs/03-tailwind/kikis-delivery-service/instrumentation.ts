import { sql } from "./lib/db";

export async function register() {
  await sql`
    CREATE TABLE IF NOT EXISTS deliveries (
      id SERIAL PRIMARY KEY,
      pickup TEXT NOT NULL,
      destination TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
    )
  `;
  // await sql`
  //   INSERT INTO deliveries (pickup, destination, status) VALUES
  //     ('Bakery', 'Clock Tower', 'active'),
  //     ('Harbour', 'Hillside Cafe', 'accepted'),
  //     ('Bookshop', 'Lighthouse', 'denied'),
  //     ('Market Square', 'Train Station', 'fulfilled');
  // `;
  await sql`
    CREATE TABLE IF NOT EXISTS snippets (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      language TEXT NOT NULL,
      description TEXT NOT NULL,
      code TEXT NOT NULL
    );
  `;

// const snippets = [
//   {
//     title: "CSS Grid Areas",
//     language: "CSS",
//     description: "Create a grid with named areas.",
//     code: ".grid-container {\n  display: grid;\n  grid-template-areas:\n    'header header header'\n    'sidebar content content'\n    'footer footer footer'; \n  grid-gap: 10px;\n  background-color: #2196F3;\n  padding: 10px;\n}",
//   },
//   {
//     title: "Range of numbers",
//     language: "JavaScript",
//     description: "Build an array from a start value up to an end value.",
//     code: "const range = (start, end) =>\n  Array.from({ length: end - start }, (_, i) => start + i);",
//   },
//   {
//     title: "Group by key",
//     language: "TypeScript",
//     description: "Turn a list into buckets keyed by one of its fields.",
//     code: "function groupBy(items, key) {\n  return items.reduce((acc, item) => {\n    (acc[item[key]] ??= []).push(item);\n    return acc;\n  }, {});\n}",
//   },
// ];
  // await sql`
  //   INSERT INTO snippets (title, language, description, code) VALUES
  //     (${snippets[0].title}, ${snippets[0].language}, ${snippets[0].description}, ${snippets[0].code}),
  //     (${snippets[1].title}, ${snippets[1].language}, ${snippets[1].description}, ${snippets[1].code}),
  //     (${snippets[2].title}, ${snippets[2].language}, ${snippets[2].description}, ${snippets[2].code});
  // `;
}
