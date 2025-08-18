import express from 'express';
import cors from 'cors';
import {parseDailyRates, parseYearlyRates} from "../api/utils/parser.util";
import {fetchWithCache} from "../api/utils/cache.util";

const app = express();
const port = 3001;

// Configure CORS with specific options
const corsOptions = {
    origin: '*',
    methods: ['GET'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Daily exchange rates endpoint
app.get('/api/daily', async (req, res) => {
    try {
        const url = "daily.txt";
        const data = await fetchWithCache(url, 'daily-rates', parseDailyRates);
        res.json(data);
    } catch (error) {
        console.error('Error fetching daily rates:', error);
        res.status(500).json({error: 'Failed to fetch daily exchange rates'});
    }
});

// Yearly exchange rates endpoint
app.get('/api/yearly', async (req, res) => {
    try {
        const year = req.query.year ?? new Date().getFullYear();
        const url = `year.txt?year=${year}`;
        const cacheKey = `yearly-rates-${year}`;
        const data = await fetchWithCache(url, cacheKey, parseYearlyRates);
        res.json(data);
    } catch (error) {
        console.error('Error fetching yearly rates:', error);
        res.status(500).json({error: 'Failed to fetch yearly exchange rates'});
    }
});

app.get('/health', (req, res) => {
    res.json({status: 'OK', timestamp: new Date().toISOString()});
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('- GET /api/rates/daily');
    console.log('- GET /api/rates/yearly?year=YYYY');
    console.log('- GET /health');
});
