import { defineConfig } from 'vite';
import type { Connect } from 'vite';

// Middleware to handle trailing slashes for static site
function trailingSlashMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const url = req.url || '';
    // Skip assets and files with extensions
    if (url.includes('.') || url.endsWith('/')) {
      return next();
    }
    // Redirect to URL with trailing slash
    res.writeHead(301, { Location: url + '/' });
    res.end();
  };
}

export default defineConfig({
  root: 'dist',
  publicDir: false,
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    {
      name: 'trailing-slash',
      configureServer(server) {
        server.middlewares.use(trailingSlashMiddleware());
      },
    },
  ],
});
