import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function EmptyState({ message = 'No data found', icon = 'search-outline' }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950 px-6">
      <Ionicons name={icon} size={64} color="#6b7280" />
      <Text className="text-gray-400 text-lg mt-4 text-center">{message}</Text>
    </View>
  );
}

