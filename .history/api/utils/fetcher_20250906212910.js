// Helper for fetching and caching
import fetch from 'node-fetch';

const BASE_URL = 'https://jiosavan-api-with-playlist.vercel.app/api';

export async function fetchFromJioSaavn(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Failed to fetch from JioSaavn API');
  return response.json();
}
