// /api/songs/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/songs', { query });
    const results = (data.results || []).map(song => simplifySong(song));
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function simplifySong(song) {
  return {
    id: song.id || song._id,
    title: song.name || song.title,
    artists: song.artists?.primary?.map(a => a.name).join(', ') || song.primaryArtists,
    album: song.album?.name || song.album_name || song.album,
    year: song.year || song.releaseDate?.slice(0, 4),
    duration: song.duration,
    language: song.language,
    playCount: song.playCount,
    url: song.url,
    image: Array.isArray(song.image) ? (song.image.find(i => i.quality === '500x500')?.url || song.image[0]?.url) : song.image
  };
}
