import type {VercelRequest, VercelResponse} from '@vercel/node'
import {parseDailyRates} from "./utils/parser.util";
import {fetchWithCache} from "./utils/cache.util";


const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        const path = `daily.txt`;
        const data = await fetchWithCache(path, 'daily', parseDailyRates);
        return res.json(data);
    } catch (error) {
        console.error('Error fetching daily rates:', error);
        return res.status(500).json({error: 'Failed to fetch daily exchange rates'});
    }
}

export default handler
