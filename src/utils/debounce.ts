export function debounce<T extends (...args: never[]) => void>(fn: T, ms = 150): T {
    let t: number | undefined;
    return ((...args: Parameters<T>) => {
        if (t) window.clearTimeout(t);
        t = window.setTimeout(() => fn(...args), ms);
    }) as T;
}
