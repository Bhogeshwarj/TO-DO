const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};
