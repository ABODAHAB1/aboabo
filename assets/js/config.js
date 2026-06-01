// Configuration
const CONFIG = {
    API: {
        COINGECKO: 'https://api.coingecko.com/api/v3',
        TIMEOUT: 10000,
        CACHE_TIME: 60000, // 1 minute
    },
    STORAGE: {
        PREFIX: 'cryptointel_',
        KEYS: {
            FAVORITES: 'favorites',
            ALERTS: 'alerts',
            SETTINGS: 'settings',
            NOTIFICATION_PERMISSION: 'notification_permission',
            DARK_MODE: 'dark_mode',
            LANGUAGE: 'language',
            CACHE: 'cache',
        }
    },
    CRYPTO: {
        TOP_COINS: [
            'bitcoin',
            'ethereum',
            'binancecoin',
            'cardano',
            'solana',
            'polkadot',
            'dogecoin',
            'ripple',
            'litecoin',
            'polygon',
        ],
        CURRENCIES: ['usd', 'eur', 'gbp', 'jpy', 'aud', 'cad'],
        DEFAULT_CURRENCY: 'usd',
    },
    UI: {
        ANIMATIONS_ENABLED: true,
        THEME: 'dark',
        LANGUAGE: 'en',
    },
    LIMITS: {
        MAX_ALERTS: 20,
        MAX_FAVORITES: 50,
        ITEMS_PER_PAGE: 10,
    },
    NOTIFICATIONS: {
        ENABLED: false,
        ICONS: {
            SUCCESS: '✅',
            ERROR: '❌',
            WARNING: '⚠️',
            INFO: 'ℹ️',
        }
    }
};
