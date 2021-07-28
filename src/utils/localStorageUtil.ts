export function saveArray(key: string, value: []): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function readArray(key: string): [] {
    return JSON.parse(localStorage.getItem(key) || '[]');
}