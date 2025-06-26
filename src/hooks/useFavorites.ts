import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useFavorites() {
  const { favorites, setFavorites, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async (articleLink: string): Promise<string> => {
    if (!isLoggedIn) {
      throw new Error('Vous devez être connecté');
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('Token non trouvé');
    }

    setLoading(true);
    const isFav = favorites.includes(articleLink);
    const url = `http://localhost:3000/api/auth/favorites/${isFav ? "remove" : "add"}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ articleLink }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Erreur lors de la mise à jour');
      }

      setFavorites(data.favorites || []);
      return isFav ? "Article retiré des favoris !" : "Article ajouté aux favoris !";
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    favorites,
    toggleFavorite,
    loading,
    isFavorite: (link: string) => favorites.includes(link)
  };
}