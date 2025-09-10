// Main API handler for Vercel deployment
export default function handler(req, res) {
  res.json({
    title: "JioSaavn API Wrapper",
    description: "A comprehensive API wrapper for JioSaavn with search, filter, and details endpoints",
    version: "1.0.0",
    baseUrl: `https://${req.headers.host}`,
    endpoints: {
      songs: {
        search: {
          url: "/api/songs?action=search",
          method: "GET",
          params: ["query", "language", "year", "minDuration", "maxDuration", "sort", "limit"],
          example: "/api/songs?action=search&query=tamil&language=tamil&sort=popularity&limit=20"
        },
        details: {
          url: "/api/songs?action=details",
          method: "GET",
          params: ["id"],
          example: "/api/songs?action=details&id=sv-h_xFH"
        },
        filter: {
          url: "/api/songs?action=filter",
          method: "GET",
          params: ["query", "language", "year", "minDuration", "maxDuration", "sort", "limit"],
          example: "/api/songs?action=filter&query=bollywood&language=hindi&year=2024&sort=latest&limit=25"
        }
      },
      albums: {
        search: {
          url: "/api/albums?action=search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/albums?action=search&query=rahman&limit=15"
        },
        details: {
          url: "/api/albums?action=details",
          method: "GET",
          params: ["id"],
          example: "/api/albums?action=details&id=58371017"
        },
        filter: {
          url: "/api/albums?action=filter",
          method: "GET",
          params: ["query", "language", "year", "sort", "limit"],
          example: "/api/albums?action=filter&query=tamil&language=tamil&sort=popularity&limit=20"
        }
      },
      artists: {
        search: {
          url: "/api/artists?action=search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/artists?action=search&query=arijit&limit=10"
        },
        details: {
          url: "/api/artists?action=details",
          method: "GET",
          params: ["id"],
          example: "/api/artists?action=details&id=459320"
        },
        top: {
          url: "/api/artists?action=top",
          method: "GET",
          params: ["id"],
          example: "/api/artists?action=top&id=459320"
        }
      },
      playlists: {
        search: {
          url: "/api/playlists?action=search",
          method: "GET",
          params: ["query", "limit"],
          example: "/api/playlists?action=search&query=bollywood&limit=20"
        },
        details: {
          url: "/api/playlists?action=details",
          method: "GET",
          params: ["id"],
          example: "/api/playlists?action=details&id=1139074020"
        },
        filter: {
          url: "/api/playlists?action=filter",
          method: "GET",
          params: ["query", "language", "year", "sort", "limit"],
          example: "/api/playlists?action=filter&query=hindi&language=hindi&sort=latest&limit=15"
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
}
