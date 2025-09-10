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
