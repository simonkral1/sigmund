require('dotenv').config();
const esbuild = require('esbuild');

// Get API key from environment
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

const buildConfig = {
  bundle: true,
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  format: 'esm',
  target: ['chrome58', 'firefox57', 'safari11'],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.ANTHROPIC_API_KEY': `"${ANTHROPIC_API_KEY}"`
  }
};

// Build main entry point
esbuild.build({
  ...buildConfig,
  entryPoints: ['src/js/main.tsx'],
  outfile: 'dist/main.js',
}).catch(() => process.exit(1));

// Build chat entry point
esbuild.build({
  ...buildConfig,
  entryPoints: ['src/js/chat-main.tsx'],
  outfile: 'dist/chat.js',
}).catch(() => process.exit(1)); 