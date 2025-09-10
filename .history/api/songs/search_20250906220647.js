// /api/songs/search
import { fetchFromJioSaavn } from '../utils/fetcher.js';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
    let results = (data.data?.results || data.results || []).map(song => simplifySong(song));

    // Apply filters after simplification
    if (language) {
      results = results.filter(song => song.language?.toLowerCase() === language.toLowerCase());
    }
    if (year) {
      results = results.filter(song => String(song.year) === String(year));
    }
    if (minDuration) {
      results = results.filter(song => Number(song.duration) >= Number(minDuration));
    }
    if (maxDuration) {
      results = results.filter(song => Number(song.duration) <= Number(maxDuration));
    }

    // Apply sorting
    if (sort === 'latest') {
      results = results.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sort === 'popularity') {
      results = results.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
    } else if (sort === 'duration') {
      results = results.sort((a, b) => (b.duration || 0) - (a.duration || 0));
    }

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
    year: parseInt(song.year) || parseInt(song.releaseDate?.slice(0, 4)) || null,
    duration: parseInt(song.duration) || null,
    language: song.language,
    playCount: parseInt(song.playCount) || 0,
    url: song.url,
    image: Array.isArray(song.image) ? (song.image.find(i => i.quality === '500x500')?.url || song.image[0]?.url) : song.image
  };
}
