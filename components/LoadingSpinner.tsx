import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <ActivityIndicator size="large" color="#10b981" />
      <Text className="text-gray-400 mt-4 text-base">{message}</Text>
    </View>
  );
}

