import { useState, useEffect, useCallback } from 'react';
import { storageService } from '@/utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await storageService.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = useCallback(async (coinId: string) => {
    try {
      await storageService.addFavorite(coinId);
      setFavorites((prev) => [...prev, coinId]);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }, []);

  const removeFavorite = useCallback(async (coinId: string) => {
    try {
      await storageService.removeFavorite(coinId);
      setFavorites((prev) => prev.filter((id) => id !== coinId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }, []);

  const isFavorite = useCallback(
    (coinId: string) => {
      return favorites.includes(coinId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (coinId: string) => {
      if (isFavorite(coinId)) {
        await removeFavorite(coinId);
      } else {
        await addFavorite(coinId);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};

