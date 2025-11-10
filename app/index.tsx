import CoinCard from '@/components/CoinCard';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import NetworkStatusBanner from '@/components/NetworkStatusBanner';
import SearchBar from '@/components/SearchBar';
import { useFavorites } from '@/hooks/useFavorites';
import { apiService } from '@/services/api';
import { Coin } from '@/types/coin';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoinsListScreen() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    loadCoins();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCoins(coins);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
      setFilteredCoins(filtered);
    }
  }, [searchQuery, coins]);

  const loadCoins = async () => {
    try {
      setError(null);
      const data = await apiService.getCoinsList(1, 100);
      setCoins(data);
      setFilteredCoins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coins');
      console.error('Error loading coins:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadCoins();
  };

  if (loading && coins.length === 0) {
    return <LoadingSpinner message="Loading cryptocurrencies..." />;
  }

  if (error && coins.length === 0) {
    return <ErrorState message={error} onRetry={loadCoins} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <StatusBar style="light" />
      <NetworkStatusBanner />
      
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#10b981"
            colors={['#10b981']}
          />
        }
      >
        <View className="px-4 pt-4">
          <View className="mb-6">
            <Text className="text-white text-3xl font-bold mb-2">Crypto Wallet</Text>
            <Text className="text-gray-400 text-base">Track your favorite cryptocurrencies</Text>
          </View>

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search coins..."
          />

          {filteredCoins.length === 0 ? (
            <EmptyState
              message={searchQuery ? 'No coins found matching your search' : 'No coins available'}
              icon={searchQuery ? 'search-outline' : 'wallet-outline'}
            />
          ) : (
            <View>
              <Text className="text-gray-400 text-sm mb-3">
                {filteredCoins.length} {filteredCoins.length === 1 ? 'coin' : 'coins'} found
              </Text>
              {filteredCoins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  isFavorite={isFavorite(coin.id)}
                  onFavoritePress={() => toggleFavorite(coin.id)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
