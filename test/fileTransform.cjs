const path = require('node:path')

/**
 * Jest transform for static assets (SVG, PNG…). Vite turns an asset import into its URL;
 * in tests the file name stands in for that URL, e.g. `import logo from './logo.svg'`
 * gives `'logo.svg'`.
 */
module.exports = {
  process(_source, filename) {
    return { code: `module.exports = ${JSON.stringify(path.basename(filename))};` }
  },
}
