import NodeCache from "node-cache";

const cache = new NodeCache({stdTTL: 30 * 60});

const CNB_BASE_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing';

export async function fetchWithCache<T>(path: string, cacheKey: string, parser: (data: string) => T): Promise<T> {
    const cachedData = cache.get(cacheKey) as T;
    if (cachedData) {
        console.log(`Using cached data for ${cacheKey}`);
        return cachedData;
    }

    try {
        const response = await fetch(`${CNB_BASE_URL}/${path}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textData = await response.text();
        const parsedData = parser(textData);

        cache.set(cacheKey, parsedData);

        return parsedData;
    } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
        throw error;
    }
}
