import type {VercelRequest, VercelResponse} from '@vercel/node'
import {parseYearlyRates} from "./utils/parser.util";
import {fetchWithCache} from "./utils/cache.util";


const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        const year = req.query.year ?? new Date().getFullYear();
        const path = `year.txt?year=${year}`;
        const data = await fetchWithCache(path, 'yearly', parseYearlyRates);
        return res.json(data);
    } catch (error) {
        console.error('Error fetching yearly rates:', error);
        return res.status(500).json({error: 'Failed to fetch yearly exchange rates'});
    }
}

export default handler
