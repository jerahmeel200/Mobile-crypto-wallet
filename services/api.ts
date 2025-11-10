const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// CoinGecko free tier doesn't require an API key
// If you have a Pro API key, you can add it via environment variables

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = COINGECKO_API_URL;
  }

  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
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

