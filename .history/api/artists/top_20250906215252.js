// /api/artists/top
import { fetchFromJioSaavn } from '../utils/fetcher.js';

function simplifySong(song) {
  return {
    id: song.id || song._id,
    title: song.name || song.title,
    artists: song.artists?.primary?.map(a => a.name).join(', ') || song.primaryArtists,
    album: song.album?.name || song.album_name || song.album,
    year: song.year,
    duration: song.duration,
    language: song.language,
    playCount: song.playCount,
    url: song.url,
    image: song.image
  };
}

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/artists/top', { id });
    const results = (data.results || []).map(simplifySong);
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
