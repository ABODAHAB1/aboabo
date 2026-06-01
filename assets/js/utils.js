// Utility Functions
const Utils = {
    // Number Formatting
    formatCurrency(value, currency = 'USD', decimals = 2) {
        if (value === null || value === undefined) return '$0.00';
        
        const symbols = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            AUD: 'A$',
            CAD: 'C$',
        };

        const symbol = symbols[currency.toUpperCase()] || '$';
        const formatted = parseFloat(value).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

        return `${symbol}${formatted}`;
    },

    formatNumber(value, decimals = 0) {
        if (value === null || value === undefined) return '0';
        return parseFloat(value).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    },

    formatPercentage(value, decimals = 2) {
        if (value === null || value === undefined) return '0%';
        const formatted = parseFloat(value).toFixed(decimals);
        return `${formatted > 0 ? '+' : ''}${formatted}%`;
    },

    // Text Formatting
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    truncateText(text, length = 100) {
        return text.length > length ? text.slice(0, length) + '...' : text;
    },

    // Date & Time
    formatDate(date, format = 'short') {
        const d = new Date(date);
        const options = {
            short: { month: 'short', day: 'numeric', year: 'numeric' },
            long: { month: 'long', day: 'numeric', year: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' },
            datetime: { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
        };
        return d.toLocaleDateString('en-US', options[format] || options.short);
    },

    formatTime(date) {
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    },

    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [name, secondsValue] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsValue);
            if (interval >= 1) {
                return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    },

    // DOM Manipulation
    byId(id) {
        return document.getElementById(id);
    },

    byClass(className, parent = document) {
        return parent.querySelectorAll(`.${className}`);
    },

    bySelector(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    createElement(tag, className = '', innerHTML = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    },

    addClass(el, className) {
        if (el) el.classList.add(className);
    },

    removeClass(el, className) {
        if (el) el.classList.remove(className);
    },

    toggleClass(el, className) {
        if (el) el.classList.toggle(className);
    },

    hasClass(el, className) {
        return el ? el.classList.contains(className) : false;
    },

    // Object Manipulation
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    merge(target, source) {
        const output = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                output[key] = source[key];
            }
        }
        return output;
    },

    // Array Operations
    groupBy(array, key) {
        return array.reduce((acc, obj) => {
            const group = obj[key];
            if (!acc[group]) acc[group] = [];
            acc[group].push(obj);
            return acc;
        }, {});
    },

    sortBy(array, key, order = 'asc') {
        const sorted = [...array].sort((a, b) => {
            const valA = a[key];
            const valB = b[key];
            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    },

    unique(array, key) {
        const seen = new Set();
        return array.filter(obj => {
            const value = key ? obj[key] : obj;
            if (seen.has(value)) return false;
            seen.add(value);
            return true;
        });
    },

    // Debounce & Throttle
    debounce(func, delay = 300) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    },

    throttle(func, limit = 1000) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Random
    randomId() {
        return Math.random().toString(36).substring(2, 11);
    },

    // Copy to clipboard
    copyToClipboard(text) {
        return navigator.clipboard.writeText(text);
    },
};
