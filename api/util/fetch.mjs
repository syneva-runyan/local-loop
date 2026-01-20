let cachedFetch;

export async function getFetch() {
  if (typeof globalThis.fetch === 'function') {
    return globalThis.fetch.bind(globalThis);
  }

  if (cachedFetch) return cachedFetch;

  const mod = await import('node-fetch');
  cachedFetch = mod.default;
  return cachedFetch;
}
