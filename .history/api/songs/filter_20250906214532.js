// /api/songs/filter
import { fetchFromJioSaavn } from '../utils/fetcher.js';

function filterSongs(songs, { language, year, minDuration, maxDuration }) {
  return songs.filter(song => {
    let match = true;
    if (language) match = match && song.language?.toLowerCase() === language.toLowerCase();
    if (year) match = match && String(song.year) === String(year);
    if (minDuration) match = match && Number(song.duration) >= Number(minDuration);
    if (maxDuration) match = match && Number(song.duration) <= Number(maxDuration);
    return match;
  });
}

function sortSongs(songs, sort) {
  if (sort === 'latest') return songs.sort((a, b) => (b.year || 0) - (a.year || 0));
  if (sort === 'popularity') return songs.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
  if (sort === 'duration') return songs.sort((a, b) => (b.duration || 0) - (a.duration || 0));
  return songs;
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

export default async function handler(req, res) {
  const { query, language, year, minDuration, maxDuration, sort } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/songs', { query });
    let results = (data.results || []).map(simplifySong);
    results = filterSongs(results, { language, year, minDuration, maxDuration });
    results = sortSongs(results, sort);
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
