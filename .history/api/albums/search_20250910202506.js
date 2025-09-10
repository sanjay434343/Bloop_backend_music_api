// /api/albums/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query, limit = 30 } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/albums', { 
      query, 
      page: 0,
      limit: limit 
    });
    const results = (data.data?.results || data.results || []).map(album => simplifyAlbum(album)).filter(Boolean);
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifyAlbum(album) {
  return {
    id: album.id,
    title: album.name || album.title,
    artists: album.artists?.primary?.map(a => a.name).join(', ') || album.primaryArtists,
    year: parseInt(album.year) || null,
    language: album.language,
    playCount: parseInt(album.playCount) || 0,
    url: album.url,
    image: Array.isArray(album.image) ? (album.image.find(i => i.quality === '500x500')?.url || album.image[0]?.url) : album.image
  };
}
