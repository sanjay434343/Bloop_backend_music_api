# JioSaavn API Wrapper

A comprehensive RESTful API wrapper for JioSaavn that provides access to songs, albums, artists, and playlists with advanced search and filtering capabilities.

## 🚀 Features

- **Powerful Search**: Search across songs, albums, artists, and playlists
- **Advanced Filtering**: Filter by language, year, duration, and popularity
- **Rich Metadata**: Get complete information including artists, albums, play counts, and artwork
- **Fast & Reliable**: Optimized endpoints with intelligent caching
- **No Authentication**: Start using immediately without API keys
- **Multi-Language Support**: Hindi, Tamil, Telugu, Punjabi, English, and more

## 📚 API Endpoints

### Songs
- `GET /api/songs/search` - Search songs with filters
- `GET /api/songs/details` - Get detailed song information
- `GET /api/songs/filter` - Advanced song filtering

### Albums
- `GET /api/albums/search` - Search albums
- `GET /api/albums/details` - Get album details
- `GET /api/albums/filter` - Filter albums by criteria

### Artists
- `GET /api/artists/search` - Search artists
- `GET /api/artists/details` - Get artist information
- `GET /api/artists/top` - Get artist's top songs

### Playlists
- `GET /api/playlists/search` - Search playlists
- `GET /api/playlists/details` - Get playlist details
- `GET /api/playlists/filter` - Filter playlists

## 🛠️ Usage Examples

```bash
# Search for Tamil songs
GET /api/songs/search?query=tamil&language=tamil&sort=popularity&limit=20

# Get song details
GET /api/songs/details?id=sv-h_xFH

# Search for AR Rahman albums
GET /api/albums/search?query=ar%20rahman&limit=10

# Get artist's top songs
GET /api/artists/top?id=459320
```

## 📝 Query Parameters

### Common Parameters
- `query` (required) - Search term
- `limit` - Number of results (default: 30, max: 50)

### Filter Parameters
- `language` - Filter by language (hindi, tamil, punjabi, etc.)
- `year` - Filter by release year
- `sort` - Sort by: latest, popularity, duration
- `minDuration` - Minimum duration in seconds
- `maxDuration` - Maximum duration in seconds

## 🚀 Deployment

### Deploy to Vercel

1. Clone this repository
2. Install dependencies: `npm install`
3. Deploy to Vercel: `vercel --prod`

### Local Development

```bash
npm install
npm start
```

The API will be available at `http://localhost:3001`

## 📖 Documentation

Visit the deployed app's root URL for interactive API documentation and live testing interface.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
