// /api/playlists/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query, limit = 30 } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/playlists', { 
      query, 
      page: 0,
      limit: limit 
    });
    const results = (data.data?.results || data.results || []).map(playlist => simplifyPlaylist(playlist));
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifyPlaylist(playlist) {
  return {
    id: playlist.id,
    title: playlist.name || playlist.title,
    year: parseInt(playlist.year) || null,
    language: playlist.language,
    playCount: parseInt(playlist.playCount) || 0,
    url: playlist.url,
    image: playlist.image
  };
}
