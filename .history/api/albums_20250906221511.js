import { fetchFromJioSaavn } from './utils/fetcher.js';

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

export default async function handler(req, res) {
  const { action = 'search' } = req.query;

  try {
    if (action === 'search' || action === 'filter') {
      const { query, language, year, sort, limit = 30 } = req.query;
      if (!query) return res.status(400).json({ error: 'Missing query param' });
      
      const data = await fetchFromJioSaavn('/search/albums', { query, page: 0, limit });
      let results = (data.data?.results || data.results || []).map(simplifyAlbum);
      
      if (action === 'filter') {
        results = filterAlbums(results, { language, year });
      }
      results = sortAlbums(results, sort);
      
      return res.json({ results });
    }
    
    if (action === 'details') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing id param' });
      
      const data = await fetchFromJioSaavn('/albums', { id });
      if (!data || !data.data) return res.status(404).json({ error: 'Album not found' });
      
      return res.json(simplifyAlbum(data.data || data));
    }
    
    res.status(400).json({ error: 'Invalid action parameter' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
