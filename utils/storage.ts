import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@crypto_wallet_favorites';

export const storageService = {
  async getFavorites(): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addFavorite(coinId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(coinId)) {
        favorites.push(coinId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  async removeFavorite(coinId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updated = favorites.filter((id) => id !== coinId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },

  async isFavorite(coinId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.includes(coinId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },
};

