"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/app/stores/favoritesStore";
import { getFavoriteSnippets, Snippet } from "@/app/actions";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { favoriteIds } = useFavoritesStore();
  const [favoriteSnippets, setFavoriteSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);
      const snippets = await getFavoriteSnippets(favoriteIds);
      setFavoriteSnippets(snippets);
      setLoading(false);
    }

    loadFavorites();
  }, [favoriteIds]);

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  if (favoriteSnippets.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <p>No favorite snippets yet. Add some!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid gap-4">
        {favoriteSnippets.map((snippet) => (
          <Card key={snippet.id}>
            <CardHeader className="flex flex-row justify-between items-start">
              <CardTitle>{snippet.title}</CardTitle>
              <FavoriteButton snippetId={snippet.id} />
            </CardHeader>
            <CardContent>
              <p className="mb-2">{snippet.description}</p>
              <p className="text-sm text-muted-foreground">
                Language: {snippet.language}
              </p>
              <Link
                href={`/snippets/${snippet.id}`}
                className="inline-block mt-2 text-primary hover:underline"
              >
                View snippet
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
