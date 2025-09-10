// /api/albums/details
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/albums', { id });
    if (!data) return res.status(404).json({ error: 'Album not found' });
    res.json(simplifyAlbum(data));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

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
