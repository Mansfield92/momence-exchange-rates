import {DailyResponse, YearlyResponse} from "../types/exchange";

// Use same-origin relative API paths so it works in dev (via Vite proxy) and in production (Vercel Functions)
async function get<T>(path: string): Promise<T> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
}

export const Api = {
    getDaily: () => get<DailyResponse>("/api/daily"),
    getYearly: (year?: number) => get<YearlyResponse>(`/api/yearly${year ? `?year=${year}` : ""}`),
};
