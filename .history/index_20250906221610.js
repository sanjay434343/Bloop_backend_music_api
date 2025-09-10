// Main API handler for Vercel deployment
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all handlers
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Homepage route - API documentation
app.get('/', (req, res) => {
  res.json({
    title: "JioSaavn API Wrapper",
    description: "A comprehensive API wrapper for JioSaavn with search, filter, and details endpoints",
    version: "1.0.0",
    baseUrl: `https://your-app.vercel.app`,
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

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
