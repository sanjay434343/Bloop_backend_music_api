// /api/playlists/details
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/playlists', { id });
    if (!data || !data.data) return res.status(404).json({ error: 'Playlist not found' });
    res.json(simplifyPlaylist(data.data || data));
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
