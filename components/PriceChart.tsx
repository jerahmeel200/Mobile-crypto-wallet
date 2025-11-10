import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface PriceChartProps {
  data: number[];
  labels?: string[];
  color?: string;
}

const screenWidth = Dimensions.get('window').width;

export default function PriceChart({ data, labels, color = '#10b981' }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <View className="bg-gray-900 rounded-xl p-4 items-center justify-center h-64">
        <Text className="text-gray-400">No chart data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data,
        color: (opacity = 1) => color,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#111827',
    backgroundGradientFrom: '#111827',
    backgroundGradientTo: '#111827',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: color,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#374151',
      strokeWidth: 1,
    },
  };

  return (
    <View className="bg-gray-900 rounded-xl p-4 mb-4">
      <Text className="text-white font-semibold text-lg mb-4">Price Trend (7 Days)</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 64}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withInnerLines={true}
        withOuterLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withDots={false}
        withShadow={false}
      />
    </View>
  );
}

