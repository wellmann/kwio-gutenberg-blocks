module.exports = {
  map: { inline: false },
  plugins: {
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    },
    'css-mqpacker': { sort: 'sort-css-media-queries' },
    'postcss-cachebuster': {},
    'postcss-csso': {}
  }
};