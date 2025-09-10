// /api/albums/details
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/albums', { id });
    if (!data || !data.data) return res.status(404).json({ error: 'Album not found' });
    res.json(simplifyAlbum(data.data || data));
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
