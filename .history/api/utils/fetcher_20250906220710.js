// Helper for fetching and caching
const BASE_URL = 'https://jiosavan-api-with-playlist.vercel.app/api';

export async function fetchFromJioSaavn(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  try {
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'JioSaavn-API-Wrapper/1.0.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch from JioSaavn API: ${error.message}`);
  }
}
