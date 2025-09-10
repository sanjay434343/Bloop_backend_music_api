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
  if (sort === 'latest') return songs.sort((a, b) => b.year - a.year);
  if (sort === 'popularity') return songs.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
  if (sort === 'duration') return songs.sort((a, b) => b.duration - a.duration);
  return songs;
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
