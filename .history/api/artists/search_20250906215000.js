// /api/artists/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query, limit = 30 } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/artists', { 
      query, 
      page: 0,
      limit: limit 
    res.status(500).json({ error: e.message });
  }
}

function simplifyArtist(artist) {
  return {
    id: artist.id,
    title: artist.title,
    url: artist.url,
    image: artist.image
  };
}
