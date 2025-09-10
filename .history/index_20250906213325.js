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

// Songs
app.get('/api/songs/search', songsSearch);
app.get('/api/songs/details', songsDetails);
app.get('/api/songs/filter', songsFilter);
// Albums
app.get('/api/albums/search', albumsSearch);
app.get('/api/albums/details', albumsDetails);
app.get('/api/albums/filter', albumsFilter);
// Artists
app.get('/api/artists/search', artistsSearch);
app.get('/api/artists/details', artistsDetails);
app.get('/api/artists/top', artistsTop);
// Playlists
app.get('/api/playlists/search', playlistsSearch);
app.get('/api/playlists/details', playlistsDetails);
app.get('/api/playlists/filter', playlistsFilter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
