// /api/playlists/filter
import { fetchFromJioSaavn } from '../utils/fetcher.js';

function filterPlaylists(playlists, { language, year }) {
  return playlists.filter(playlist => {
    let match = true;
    if (language) match = match && playlist.language?.toLowerCase() === language.toLowerCase();
    if (year) match = match && String(playlist.year) === String(year);
    return match;
  });
}

function sortPlaylists(playlists, sort) {
  if (sort === 'latest') return playlists.sort((a, b) => b.year - a.year);
  if (sort === 'popularity') return playlists.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
  return playlists;
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

export default async function handler(req, res) {
  const { query, language, year, sort, limit = 30 } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/playlists', { 
      query, 
      page: 0,
      limit: limit 
    });
    let results = (data.data?.results || data.results || []).map(simplifyPlaylist);
    res.status(500).json({ error: e.message });
  }
}
