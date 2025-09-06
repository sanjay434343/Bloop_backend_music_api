// /api/artists/top
import { fetchFromJioSaavn } from '../utils/fetcher.js';

function simplifySong(song) {
  return {
    id: song.id || song._id,
    title: song.name || song.title,
    artists: song.artists?.primary?.map(a => a.name).join(', ') || song.primaryArtists,
    album: song.album?.name || song.album_name || song.album,
    year: parseInt(song.year) || parseInt(song.releaseDate?.slice(0, 4)) || null,
    duration: parseInt(song.duration) || null,
    language: song.language,
    playCount: parseInt(song.playCount) || 0,
    url: song.url,
    image: Array.isArray(song.image) ? (song.image.find(i => i.quality === '500x500')?.url || song.image[0]?.url) : song.image,
    downloadUrl: song.downloadUrl || []
  };
}

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id param' });
  try {
    const data = await fetchFromJioSaavn('/artists/top', { id });
    const results = (data.data?.results || data.results || []).map(simplifySong);
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
