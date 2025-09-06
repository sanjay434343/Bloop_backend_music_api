# JioSaavn API Wrapper

A comprehensive RESTful API wrapper for JioSaavn with advanced search, filtering, and details endpoints.

## 🚀 Live Demo

- **API Documentation**: [Your Vercel URL]
- **Interactive UI**: [Your Vercel URL]/ui

## 📋 Features

- 🎵 Search songs, albums, artists, and playlists
- 🔍 Advanced filtering by language, year, duration
- 📊 Sorting by popularity, latest, duration
- 🌐 Multi-language support (Hindi, Tamil, Telugu, Punjabi, English)
- ⚡ Fast serverless deployment on Vercel
- 🔧 Developer-friendly JSON responses
- 📱 Interactive web interface

## 🛠️ Deployment

1. Fork this repository
2. Connect to Vercel
3. Deploy automatically
4. Your API will be live at `your-project.vercel.app`

## 📖 API Endpoints

### Songs
- `GET /api/songs/search` - Search songs
- `GET /api/songs/details` - Get song details
- `GET /api/songs/filter` - Advanced song filtering

### Albums
- `GET /api/albums/search` - Search albums
- `GET /api/albums/details` - Get album details
- `GET /api/albums/filter` - Advanced album filtering

### Artists
- `GET /api/artists/search` - Search artists
- `GET /api/artists/details` - Get artist details
- `GET /api/artists/top` - Get artist's top songs

### Playlists
- `GET /api/playlists/search` - Search playlists
- `GET /api/playlists/details` - Get playlist details
- `GET /api/playlists/filter` - Advanced playlist filtering

## 🔧 Usage Examples

```bash
# Search Tamil songs
GET /api/songs/search?query=tamil&language=tamil&limit=20

# Get popular Arijit Singh songs
GET /api/songs/search?query=arijit%20singh&sort=popularity&limit=15

# Search AR Rahman albums
GET /api/albums/search?query=ar%20rahman&limit=10
```

## 📝 License

MIT License - feel free to use in your projects!
