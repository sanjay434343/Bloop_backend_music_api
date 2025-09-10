// Local Express server to run all API endpoints
import express from 'express';
import songsSearch from './api/songs/search.js';
import songsDetails from './api/songs/details.js';
import songsFilter from './api/songs/filter.js';
import albumsSearch from './api/albums/search.js';
import albumsDetails from './api/albums/details.js';
import albumsFilter from './api/albums/filter.js';
import artistsSearch from './api/artists/search.js';
import artistsDetails from './api/artists/details.js';
import artistsTop from './api/artists/top.js';
import playlistsSearch from './api/playlists/search.js';
import playlistsDetails from './api/playlists/details.js';
import playlistsFilter from './api/playlists/filter.js';

const app = express();

// Homepage route
app.get('/', (req, res) => {
  res.json({
    title: "JioSaavn API Wrapper",
    description: "A comprehensive API wrapper for JioSaavn with search, filter, and details endpoints",
    version: "1.0.0",
    baseUrl: `http://localhost:${process.env.PORT || 3001}`,
    endpoints: {
      songs: {
        search: {
          url: "/api/songs/search",
          method: "GET",
          params: ["query", "language", "year", "minDuration", "maxDuration", "sort", "limit"],
          example: "/api/songs/search?query=tamil&language=tamil&sort=popularity&limit=20"
        },
app.get('/api/playlists/filter', playlistsFilter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
