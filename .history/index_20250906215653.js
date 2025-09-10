// Local Express server to run all API endpoints
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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
        details: {
          url: "/api/songs/details",
          method: "GET",
          params: ["id"],
          example: "/api/songs/details?id=sv-h_xFH"
        },
        filter: {
          url: "/api/songs/filter",
          method: "GET",
          params: ["query", "language", "year", "minDuration", "maxDuration", "sort", "limit"],
          example: "/api/songs/filter?query=bollywood&language=hindi&year=2024&sort=latest&limit=25"
        }
      },
      albums: {
        search: {
          url: "/api/albums/search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/albums/search?query=rahman&limit=15"
        },
        details: {
          url: "/api/albums/details",
          method: "GET",
          params: ["id"],
          example: "/api/albums/details?id=58371017"
        },
        filter: {
          url: "/api/albums/filter",
          method: "GET",
          params: ["query", "language", "year", "sort", "limit"],
          example: "/api/albums/filter?query=tamil&language=tamil&sort=popularity&limit=20"
        }
      },
      artists: {
        search: {
          url: "/api/artists/search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/artists/search?query=arijit&limit=10"
        },
        details: {
          url: "/api/artists/details",
          method: "GET",
          params: ["id"],
          example: "/api/artists/details?id=459320"
        },
        top: {
          url: "/api/artists/top",
          method: "GET",
          params: ["id"],
          example: "/api/artists/top?id=459320"
        }
      },
      playlists: {
        search: {
          url: "/api/playlists/search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/playlists/search?query=bollywood&limit=20"
        },
        details: {
          url: "/api/playlists/details",
          method: "GET",
          params: ["id"],
          example: "/api/playlists/details?id=1139074020"
        },
        filter: {
          url: "/api/playlists/filter",
          method: "GET",
          params: ["query", "language", "year", "sort", "limit"],
          example: "/api/playlists/filter?query=hindi&language=hindi&sort=latest&limit=15"
        }
      }
    },
    usage: {
      filterOptions: {
        sort: ["latest", "popularity", "duration"],
        language: ["hindi", "tamil", "punjabi", "telugu", "english", "etc"],
        limit: "Default: 30, Max recommended: 50"
      },
      sampleQueries: [
        "tamil songs",
        "arijit singh",
        "bollywood hits",
        "punjabi songs",
        "ar rahman"
      ]
    }
  });
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
