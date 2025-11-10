import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '@/services/api';
import { CoinDetails } from '@/types/coin';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import PriceChart from '@/components/PriceChart';
import { formatPrice, formatCurrency, formatPercentage, formatNumber } from '@/utils/formatters';
import { useFavorites } from '@/hooks/useFavorites';
import NetworkStatusBanner from '@/components/NetworkStatusBanner';

export default function CoinDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      loadCoinDetails();
    }
  }, [id]);

  const loadCoinDetails = async () => {
    try {
      setError(null);
      const [coinData, priceData] = await Promise.all([
        apiService.getCoinDetails(id!),
        apiService.getCoinPriceHistory(id!, 7),
      ]);

      setCoin(coinData);
      
      // Extract prices from the price history
      const prices = priceData.prices.map(([timestamp, price]) => price);
      setPriceHistory(prices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coin details');
      console.error('Error loading coin details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritePress = async () => {
    try {
      await toggleFavorite(id!);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  if (loading) {
    return <LoadingSpinner message="Loading coin details..." />;
  }

  if (error || !coin) {
    return <ErrorState message={error || 'Coin not found'} onRetry={loadCoinDetails} />;
  }

  const priceChange = coin.market_data?.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;
  const currentPrice = coin.market_data?.current_price?.usd || 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <StatusBar style="light" />
      <NetworkStatusBanner />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-gray-900 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFavoritePress}
              className="bg-gray-900 p-2 rounded-full"
            >
              <Ionicons
                name={isFavorite(id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(id) ? '#ef4444' : '#fff'}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: coin.image?.large || coin.image }}
              className="w-16 h-16 rounded-full mr-4"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold">{coin.name}</Text>
              <Text className="text-gray-400 text-base uppercase">{coin.symbol}</Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-white text-4xl font-bold mb-2">{formatPrice(currentPrice)}</Text>
            <View className="flex-row items-center">
              <View
                className={`px-3 py-1.5 rounded-lg flex-row items-center ${
                  isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
              >
                <Ionicons
                  name={isPositive ? 'trending-up' : 'trending-down'}
                  size={16}
                  color={isPositive ? '#10b981' : '#ef4444'}
                />
                <Text
                  className={`ml-2 text-base font-semibold ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatPercentage(priceChange)} (24h)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chart */}
        {priceHistory.length > 0 && (
          <View className="px-4 mb-4">
            <PriceChart data={priceHistory} color={isPositive ? '#10b981' : '#ef4444'} />
          </View>
        )}

        {/* Market Stats */}
        <View className="px-4 mb-4">
          <Text className="text-white text-xl font-bold mb-4">Market Statistics</Text>
          <View className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
              <Text className="text-gray-400 text-base">Market Cap</Text>
              <Text className="text-white font-semibold text-base">
                {formatCurrency(coin.market_data?.market_cap?.usd || 0)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
              <Text className="text-gray-400 text-base">Total Volume</Text>
              <Text className="text-white font-semibold text-base">
                {formatCurrency(coin.market_data?.total_volume?.usd || 0)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
              <Text className="text-gray-400 text-base">24h High</Text>
              <Text className="text-white font-semibold text-base">
                {formatPrice(coin.market_data?.high_24h?.usd || 0)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
              <Text className="text-gray-400 text-base">24h Low</Text>
              <Text className="text-white font-semibold text-base">
                {formatPrice(coin.market_data?.low_24h?.usd || 0)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-400 text-base">Circulating Supply</Text>
              <Text className="text-white font-semibold text-base">
                {formatNumber(coin.market_data?.circulating_supply || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {coin.description?.en && (
          <View className="px-4 mb-4">
            <Text className="text-white text-xl font-bold mb-4">About</Text>
            <View className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <Text className="text-gray-300 text-sm leading-6">
                {coin.description.en.replace(/<[^>]*>/g, '').substring(0, 500)}
                {coin.description.en.length > 500 && '...'}
              </Text>
            </View>
          </View>
        )}

        {/* Links */}
        {coin.links?.homepage?.[0] && (
          <View className="px-4 mb-6">
            <Text className="text-white text-xl font-bold mb-4">Links</Text>
            <View className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <TouchableOpacity
                onPress={() => openLink(coin.links.homepage[0])}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center">
                  <Ionicons name="globe-outline" size={20} color="#10b981" />
                  <Text className="text-white ml-3 text-base">Official Website</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

