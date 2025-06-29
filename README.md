# Music Library - Main Host Application

This is the main host application for the Music Library micro frontend architecture. It serves as the container application that dynamically loads the Music Library micro frontend using Module Federation.

## 🎯 Features

- **Micro Frontend Architecture**: Uses Module Federation to load the Music Library micro frontend
- **Dynamic Loading**: Lazy loads the remote music library component
- **Error Handling**: Graceful error handling for remote component loading
- **Loading States**: Beautiful loading animations while remote components load

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd main-host
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🔧 Configuration

The application is configured to load the Music Library micro frontend from:
- **Development**: `http://localhost:4173/assets/remoteEntry.js`
- **Production**: `https://music-library-ui-remote.vercel.app/assets/remoteEntry.js`

Configuration is handled in `vite.config.ts` using the `@originjs/vite-plugin-federation` plugin.

## 🏗️ Architecture

```
main-host/
├── src/
│   ├── App.tsx          # Main container component
│   ├── App.css          # Main app styles
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── vite.config.ts       # Vite configuration with Module Federation
└── package.json         # Dependencies and scripts
```

## 🔗 Integration with Music Library

The main host application integrates with the Music Library micro frontend through:

1. **Module Federation**: Configured in `vite.config.ts`
2. **Dynamic Import**: The music library is loaded as a remote component
3. **Shared Dependencies**: React is shared between host and remote

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Add GitHub Pages configuration to your repository
2. Set the build output directory to `dist`
3. Deploy on push to main branch

## 🔐 Authentication

The Music Library micro frontend handles authentication with the following credentials:

### Demo Credentials

- **Admin User**:
  - Username: `admin`
  - Role: `admin`
  - Permissions: Can add, delete, view, filter, and sort songs

- **Regular User**:
  - Username: `user`
  - Role: `user`
  - Permissions: Can only view, filter, and sort songs

## 🎵 Music Library Features

The integrated Music Library micro frontend provides:

- **Song Management**: View, add, and delete songs (admin only)
- **Advanced Filtering**: Filter by title, artist, album, or genre
- **Sorting**: Sort by title, artist, album, or year (ascending/descending)
- **Grouping**: Group songs by album, artist, or year
- **Statistics**: Real-time statistics using JavaScript reduce functions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Module Federation

The application uses Module Federation to load the Music Library micro frontend:

```typescript
// vite.config.ts
federation({
  name: "main-host",
  remotes: {
    music_library_ui_remote_components: isDev
      ? "http://localhost:4173/assets/remoteEntry.js"
      : "https://music-library-ui-remote.vercel.app/assets/remoteEntry.js",
  },
  shared: ["react"],
})
```

## 🔍 Troubleshooting

### Common Issues

1. **Remote component not loading**:
   - Ensure the Music Library micro frontend is running on port 4173
   - Check network connectivity
   - Verify CORS settings

2. **Build errors**:
   - Clear `node_modules` and reinstall dependencies
   - Check TypeScript configuration
   - Verify all dependencies are compatible

3. **Module Federation issues**:
   - Ensure both host and remote are using compatible versions
   - Check shared dependencies configuration
   - Verify remote entry point is accessible

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [Main Application](https://main-host.vercel.app)
- **Music Library**: [Micro Frontend](https://music-library-ui-remote.vercel.app)
- **Repository**: [GitHub](https://github.com/yourusername/music-library)

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
