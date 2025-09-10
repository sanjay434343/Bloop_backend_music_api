// /api/songs/details
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/songs', { id });
    if (!data) return res.status(404).json({ error: 'Song not found' });
    res.json(simplifySong(data));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifySong(song) {
  return {
    id: song.id,
    title: song.title,
    artists: song.primaryArtists,
    album: song.album,
    year: song.year,
    duration: song.duration,
    language: song.language,
    playCount: song.playCount,
    url: song.url,
    image: song.image
  };
}
