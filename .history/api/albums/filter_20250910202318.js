// /api/albums/filter
import { fetchFromJioSaavn } from '../utils/fetcher.js';

function filterAlbums(albums, { language, year }) {
  return albums.filter(album => {
    let match = true;
    if (language) match = match && album.language?.toLowerCase() === language.toLowerCase();
    if (year) match = match && String(album.year) === String(year);
    return match;
  });
}

function sortAlbums(albums, sort) {
  if (sort === 'latest') return albums.sort((a, b) => b.year - a.year);
  if (sort === 'popularity') return albums.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
  return albums;
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

export default async function handler(req, res) {
  const { query, language, year, sort, limit = 30 } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });
  try {
    const data = await fetchFromJioSaavn('/search/albums', { 
      query, 
      page: 0,
      limit: limit 
    });
    let results = (data.data?.results || data.results || []).map(simplifyAlbum);
    results = filterAlbums(results, { language, year });
    results = sortAlbums(results, sort);
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
