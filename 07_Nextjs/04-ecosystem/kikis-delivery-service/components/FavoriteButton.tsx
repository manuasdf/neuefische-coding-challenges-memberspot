"use client";

import { useFavoritesStore } from "@/app/stores/favoritesStore";
import { Button } from "./ui/button";

interface FavoriteButtonProps {
  snippetId: number | undefined;
}

export function FavoriteButton({ snippetId }: FavoriteButtonProps) {
  if (!snippetId)
    return;
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isFavorite = favoriteIds.includes(snippetId);

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      onClick={() => toggleFavorite(snippetId)}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "★ Favorite" : "☆ Favorite"}
    </Button>
  );
}
