import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Coin } from '@/types/coin';
import { formatPrice, formatPercentage } from '@/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CoinCardProps {
  coin: Coin;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export default function CoinCard({ coin, isFavorite = false, onFavoritePress }: CoinCardProps) {
  const router = useRouter();
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/coin-details/${coin.id}`)}
      className="bg-gray-900 rounded-xl p-4 mb-3 flex-row items-center border border-gray-800 active:bg-gray-800"
    >
      <View className="mr-3">
        <Image
          source={{ uri: coin.image }}
          className="w-12 h-12 rounded-full"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-white font-semibold text-base">{coin.name}</Text>
          {onFavoritePress && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onFavoritePress();
              }}
              className="ml-2"
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? '#ef4444' : '#6b7280'}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-gray-400 text-xs uppercase mb-2">{coin.symbol}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-bold text-lg">{formatPrice(coin.current_price)}</Text>
          <View
            className={`px-2 py-1 rounded-lg flex-row items-center ${
              isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={14}
              color={isPositive ? '#10b981' : '#ef4444'}
            />
            <Text
              className={`ml-1 text-xs font-semibold ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {formatPercentage(coin.price_change_percentage_24h)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

