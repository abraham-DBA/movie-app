# 🎬 MovieFinder - Discover Movies You'll Love

A modern, responsive web application for discovering and searching movies built with React, TMDB API, and Appwrite. Find popular movies or search for specific titles with an intuitive interface.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-orange)
![TMDB](https://img.shields.io/badge/TMDB-API-red)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-f02e65)

## ✨ Features

- **🔍 Smart Search** - Real-time movie search with debounced input
- **🎯 Popular Movies** - Discover trending and popular movies
- **📊 Search Analytics** - Track search metrics using Appwrite backend
- **🎨 Modern UI** - Clean, responsive design with smooth animations
- **⚡ Fast Performance** - Built with Vite for optimal loading speeds
- **📱 Mobile Friendly** - Fully responsive across all devices

## 🚀 Live Demo

https://movie-app-omega-coral.vercel.app/

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Hot Toast

**Backend & APIs:**
- TMDB API (The Movie Database)
- Appwrite (Backend-as-a-Service)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moviefinder.git
   cd moviefinder

3. ## Install dependencies
```bash
- npm install
```

4. ## Environment Setup
```bash
Create a .env file in the root directory:
- VITE_TMDB_API_KEY=your_tmdb_api_key_here
- VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
- VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
- VITE_APPWRITE_TABLE_ID=metrics
```

## 🏗️ Project Structure
```
src/
├── components/
│ ├── MovieCard.jsx # Individual movie card component
│ ├── Search.jsx # Search input component
│ └── Spinner.jsx # Loading spinner
├── App.jsx # Main application component
└── main.jsx # Application entry point
```
## 🔧 Configuration
**Appwrite Setup**
1. Create a new project in Appwrite Cloud
2. Set up a database named movies
3. Create a table named metrics with the following columns:
  - searchTerm (string)
  - count (integer)
  - poster_url (url)
  - movie_id (integer)

poster_url (string)

## TMDB API
- Register at The Movie Database
- Generate an API key from your account settings
- Add the key to your .env file

