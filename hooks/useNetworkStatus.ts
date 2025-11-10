import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        const connected = networkState.isConnected ?? networkState.isInternetReachable ?? true;
        setIsOnline(connected);
        
        // Check if connection is slow (2G or 3G)
        const connectionType = networkState.type;
        setIsSlowConnection(
          connectionType === Network.NetworkStateType.CELLULAR_2G ||
          connectionType === Network.NetworkStateType.CELLULAR_3G
        );
      } catch (error) {
        console.error('Error checking network status:', error);
        // Default to offline on error
        setIsOnline(false);
      }
    };

    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return { isOnline, isSlowConnection };
};

