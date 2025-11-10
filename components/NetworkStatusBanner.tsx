import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function NetworkStatusBanner() {
  const { isOnline, isSlowConnection } = useNetworkStatus();

  if (isOnline && !isSlowConnection) {
    return null;
  }

  return (
    <View
      className={`px-4 py-2 flex-row items-center justify-center ${
        !isOnline ? 'bg-red-500/20' : 'bg-yellow-500/20'
      }`}
    >
      <Ionicons
        name={!isOnline ? 'wifi-outline' : 'warning-outline'}
        size={16}
        color={!isOnline ? '#ef4444' : '#fbbf24'}
      />
      <Text
        className={`ml-2 text-xs font-semibold ${
          !isOnline ? 'text-red-400' : 'text-yellow-400'
        }`}
      >
        {!isOnline ? 'No Internet Connection' : 'Slow Connection Detected'}
      </Text>
    </View>
  );
}

