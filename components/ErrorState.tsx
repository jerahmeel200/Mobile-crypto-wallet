import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950 px-6">
      <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
      <Text className="text-white text-lg font-semibold mt-4 text-center">{message}</Text>
      <Text className="text-gray-400 text-sm mt-2 text-center">
        Please check your connection and try again
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 flex-row items-center"
        >
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

