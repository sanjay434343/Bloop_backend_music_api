// /api/playlists/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/playlists', { query });
    const results = (data.results || []).map(playlist => simplifyPlaylist(playlist));
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifyPlaylist(playlist) {
  return {
    id: playlist.id,
    title: playlist.title,
    year: playlist.year,
    language: playlist.language,
    playCount: playlist.playCount,
    url: playlist.url,
    image: playlist.image
  };
}
