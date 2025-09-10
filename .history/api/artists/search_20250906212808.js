// /api/artists/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/artists', { query });
    const results = (data.results || []).map(artist => simplifyArtist(artist));
    res.json({ results });
  } catch (e) {
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
