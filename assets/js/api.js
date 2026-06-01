// API Functions
const API = {
    async fetch(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('API Error:', error);
            throw error;
        }
    },

    // CoinGecko API Methods
    async getMarketData() {
        const cache = Storage.get('market_data');
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME) {
            return cache.data;
        }

        const url = `${CONFIG.API.COINGECKO}/global?vs_currency=usd`;
        const data = await this.fetch(url);
        
        Storage.set('market_data', {
            data: data.data,
            timestamp: Date.now(),
        });
        
        return data.data;
    },

    async getCoinData(coinId) {
        const cache = Storage.get(`coin_${coinId}`);
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME) {
            return cache.data;
        }

        const params = new URLSearchParams({
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 1,
            page: 1,
            sparkline: false,
        });

        const url = `${CONFIG.API.COINGECKO}/coins/${coinId}?${params}`;
        const data = await this.fetch(url);
        
        Storage.set(`coin_${coinId}`, {
            data,
            timestamp: Date.now(),
        });
        
        return data;
    },

    async getTopCoins(limit = 10, page = 1) {
        const cache = Storage.get(`top_coins_${limit}_${page}`);
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME) {
            return cache.data;
        }

        const params = new URLSearchParams({
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: page,
            sparkline: true,
        });

        const url = `${CONFIG.API.COINGECKO}/coins/markets?${params}`;
        const data = await this.fetch(url);
        
        Storage.set(`top_coins_${limit}_${page}`, {
            data,
            timestamp: Date.now(),
        });
        
        return data;
    },

    async searchCoins(query) {
        if (!query || query.length < 2) return [];
        
        const url = `${CONFIG.API.COINGECKO}/search?query=${encodeURIComponent(query)}`;
        const data = await this.fetch(url);
        return data.coins || [];
    },

    async getCoinChart(coinId, days = 7) {
        const cache = Storage.get(`chart_${coinId}_${days}`);
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME) {
            return cache.data;
        }

        const url = `${CONFIG.API.COINGECKO}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
        const data = await this.fetch(url);
        
        Storage.set(`chart_${coinId}_${days}`, {
            data,
            timestamp: Date.now(),
        });
        
        return data;
    },

    async getTrending() {
        const cache = Storage.get('trending');
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME) {
            return cache.data;
        }

        const url = `${CONFIG.API.COINGECKO}/search/trending`;
        const data = await this.fetch(url);
        
        Storage.set('trending', {
            data: data.coins || [],
            timestamp: Date.now(),
        });
        
        return data.coins || [];
    },

    async getFearGreedIndex() {
        const cache = Storage.get('fear_greed');
        if (cache && cache.timestamp > Date.now() - CONFIG.API.CACHE_TIME * 60) {
            return cache.data;
        }

        try {
            const url = 'https://api.alternative.me/fng/?limit=1&format=json';
            const data = await this.fetch(url);
            
            Storage.set('fear_greed', {
                data: data.data[0],
                timestamp: Date.now(),
            });
            
            return data.data[0];
        } catch (error) {
            return {
                value: '50',
                value_classification: 'Neutral',
                timestamp: Date.now().toString(),
            };
        }
    },

    async getGainers(limit = 5) {
        const coins = await this.getTopCoins(250);
        return coins
            .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
            .slice(0, limit);
    },

    async getLosers(limit = 5) {
        const coins = await this.getTopCoins(250);
        return coins
            .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))
            .slice(0, limit);
    },
};
