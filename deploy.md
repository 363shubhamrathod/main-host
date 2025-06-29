# Deployment Guide - Music Library Application

This guide provides step-by-step instructions for deploying both the main host application and the music library micro frontend to various platforms.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

#### Deploy Main Host Application

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Navigate to main-host directory**:
```bash
cd main-host
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name (e.g., `main-host`)
   - Confirm deployment settings

#### Deploy Music Library Micro Frontend

1. **Navigate to music-library-ui-remote directory**:
```bash
cd music-library-ui-remote
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name (e.g., `music-library-ui-remote`)
   - Confirm deployment settings

### Option 2: Netlify

#### Deploy Main Host Application

1. **Build the application**:
```bash
cd main-host
npm run build
```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

#### Deploy Music Library Micro Frontend

1. **Build the application**:
```bash
cd music-library-ui-remote
npm run build
```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

### Option 3: GitHub Pages

#### Deploy Main Host Application

1. **Add GitHub Pages configuration**:
   - Go to repository settings
   - Enable GitHub Pages
   - Set source to GitHub Actions

2. **Create GitHub Actions workflow**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Deploy Music Library Micro Frontend

1. **Add GitHub Pages configuration**:
   - Go to repository settings
   - Enable GitHub Pages
   - Set source to GitHub Actions

2. **Create GitHub Actions workflow** (same as above)

## 🔧 Configuration Updates

### Update Remote URLs

After deployment, update the remote URLs in the main host application:

```typescript
// main-host/vite.config.ts
const remotes = {
  music_library_ui_remote_components: isDev
    ? "http://localhost:4173/assets/remoteEntry.js"
    : "https://your-music-library-domain.vercel.app/assets/remoteEntry.js", // Update this
};
```

### Environment Variables

For production deployments, consider using environment variables:

```typescript
// main-host/vite.config.ts
const remotes = {
  music_library_ui_remote_components: isDev
    ? "http://localhost:4173/assets/remoteEntry.js"
    : process.env.MUSIC_LIBRARY_URL || "https://music-library-ui-remote.vercel.app/assets/remoteEntry.js",
};
```

## 🌐 Domain Configuration

### Custom Domains

#### Vercel
1. Go to project settings
2. Add custom domain
3. Configure DNS records

#### Netlify
1. Go to site settings
2. Add custom domain
3. Configure DNS records

### CORS Configuration

Ensure CORS is properly configured for Module Federation:

```typescript
// music-library-ui-remote/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "music-library-ui-remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react"],
    }),
  ],
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

## 🔍 Post-Deployment Verification

### Checklist

- [ ] Main host application loads successfully
- [ ] Music library micro frontend loads dynamically
- [ ] Authentication works (admin/user login)
- [ ] All features work (filtering, sorting, grouping)
- [ ] Admin can add/delete songs
- [ ] User can only view songs
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Performance is acceptable

### Testing Commands

```bash
# Test main host locally
cd main-host
npm run dev

# Test music library locally
cd music-library-ui-remote
npm run dev

# Test production builds
cd main-host
npm run build
npm run preview

cd music-library-ui-remote
npm run build
npm run preview
```

## 🚨 Troubleshooting

### Common Issues

1. **Module Federation not loading**:
   - Check remote URL is correct
   - Verify CORS settings
   - Check network connectivity
   - Ensure both apps are deployed

2. **Build errors**:
   - Clear `node_modules` and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are compatible

3. **Authentication issues**:
   - Clear browser localStorage
   - Check for console errors
   - Verify JWT implementation

4. **Performance issues**:
   - Enable compression
   - Optimize bundle size
   - Use CDN for static assets

### Debug Commands

```bash
# Check build output
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint

# Check bundle size
npx vite-bundle-analyzer
```

## 📊 Monitoring

### Performance Monitoring

- Use Vercel Analytics or Netlify Analytics
- Monitor Core Web Vitals
- Track error rates
- Monitor load times

### Error Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor console errors
- Track user interactions

## 🔄 Continuous Deployment

### GitHub Actions Workflow

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Open an issue in the repository
4. Contact platform support

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/) 