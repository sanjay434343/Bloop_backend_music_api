// /api/artists/details
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/artists', { id });
    if (!data || !data.data) return res.status(404).json({ error: 'Artist not found' });
    res.json(simplifyArtist(data.data || data));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifyArtist(artist) {
  return {
    id: artist.id,
    title: artist.name || artist.title,
    url: artist.url,
    image: artist.image
  };
}
