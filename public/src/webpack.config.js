const path = require('path');

module.exports = {
    // Set the mode to 'development' or 'production'. 
    // 'development' provides more detailed error messages and faster builds.
    // 'production' enables optimizations like minification.
    mode: 'production', // You can change this to 'production' for a production build

    // Define the entry point(s) of your application.
    // Webpack will start bundling from these files.
    // You can specify multiple entry points as an array.
    entry: {
        home: './public/src/index.js',
        doze: './public/src/doze.js'
    },

    // Define where Webpack should output the bundled files.
    output: {
        // The directory where the bundled files will be saved.
        // `path.resolve(__dirname, 'dist')` creates a 'dist' folder in your project root.
        path: path.resolve(__dirname, '../'),

        // The name of the bundled JavaScript file.
        // `[name]` would use the entry point name (if you had multiple named entries).
        // `[contenthash]` can be added for cache busting in production (e.g., 'bundle.[contenthash].js').
        filename: '[name].bundle.js' // You can change this to any desired name
    },

    // Optional: Add a devtool for source maps, which help with debugging.
    // 'eval-source-map' is good for development.
    // For production, consider 'source-map' or 'hidden-source-map'.
    // devtool: false,
};