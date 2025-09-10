// Main API handler for Vercel deployment
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all handlers
import songsSearch from './api/songs/search.js';

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

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
