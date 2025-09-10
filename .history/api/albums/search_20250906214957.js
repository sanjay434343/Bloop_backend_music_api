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
    const results = (data.data?.results || data.results || []).map(album => simplifyAlbum(album));
    res.json({ results });

function simplifyAlbum(album) {
  return {
    id: album.id,
    title: album.title,
    artists: album.primaryArtists,
    year: album.year,
    language: album.language,
    playCount: album.playCount,
    url: album.url,
    image: album.image
  };
}
