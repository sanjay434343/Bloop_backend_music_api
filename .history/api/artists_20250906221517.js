import { fetchFromJioSaavn } from './utils/fetcher.js';

function simplifyArtist(artist) {
  return {
    id: artist.id,
    title: artist.name || artist.title,
    url: artist.url,
    image: Array.isArray(artist.image) ? (artist.image.find(i => i.quality === '500x500')?.url || artist.image[0]?.url) : artist.image
  };
}

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
    image: Array.isArray(song.image) ? (song.image.find(i => i.quality === '500x500')?.url || song.image[0]?.url) : song.image
  };
}

export default async function handler(req, res) {
  const { action = 'search' } = req.query;

  try {
    if (action === 'search') {
      const { query, limit = 30 } = req.query;
      if (!query) return res.status(400).json({ error: 'Missing query param' });
      
      const data = await fetchFromJioSaavn('/search/artists', { query, page: 0, limit });
      const results = (data.data?.results || data.results || []).map(simplifyArtist);
      
      return res.json({ results });
    }
    
    if (action === 'details') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing id param' });
      
      const data = await fetchFromJioSaavn('/artists', { id });
      if (!data || !data.data) return res.status(404).json({ error: 'Artist not found' });
      
      return res.json(simplifyArtist(data.data || data));
    }
    
    if (action === 'top') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing id param' });
      
      const data = await fetchFromJioSaavn('/artists/top', { id });
      const results = (data.data?.results || data.results || []).map(simplifySong);
      
      return res.json({ results });
    }
    
    res.status(400).json({ error: 'Invalid action parameter' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
