import Constants from 'expo-constants';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';



class ApiService {
  private baseUrl: string;
  private apiKey: string | undefined;

  constructor() {
    this.baseUrl = COINGECKO_API_URL;
   
    this.apiKey = 
      process.env.EXPO_PUBLIC_COINGECKO_API_KEY ||
      process.env.COINGECKO_API_KEY ||
      Constants.expoConfig?.extra?.coingeckoApiKey;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add API key to headers if available
    if (this.apiKey) {
      headers['x-cg-pro-api-key'] = this.apiKey;
    }

    return headers;
  }

  private buildUrl(endpoint: string): string {
    const url = `${this.baseUrl}${endpoint}`;
    
     
    if (this.apiKey) {
      const separator = endpoint.includes('?') ? '&' : '?';
      return `${url}${separator}x_cg_pro_api_key=${this.apiKey}`;
    }
    
    return url;
  }

  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const headers = {
        ...this.getHeaders(),
        ...options?.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  }

  async getCoinsList(page: number = 1, perPage: number = 50): Promise<any[]> {
    return this.fetchWithErrorHandling<any[]>(
      `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`
    );
  }

  async getCoinDetails(coinId: string): Promise<any> {
    return this.fetchWithErrorHandling<any>(
      `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
  }

  async getCoinPriceHistory(
    coinId: string,
    days: number = 7
  ): Promise<{ prices: [number, number][] }> {
    return this.fetchWithErrorHandling<{ prices: [number, number][] }>(
      `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
  }

  async searchCoins(query: string): Promise<any[]> {
    return this.fetchWithErrorHandling<any[]>(
      `/search?query=${encodeURIComponent(query)}`
    );
  }
}

export const apiService = new ApiService();

