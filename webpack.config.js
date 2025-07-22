const path = require('path');

module.exports = {
    // Set the target to 'node'
    // This tells Webpack to compile for a Node.js environment.
    // It also automatically handles some Node.js built-in modules as externals.
    target: 'node',

    // Define the entry point(s) of your application
    entry: './server.js', // Assuming your main application file is src/index.js

    // Define the output configuration
    output: {
        // The output directory for your bundled files
        path: path.resolve(__dirname, './'), // Or simply __dirname
        // The name of the bundled file
        filename: 'bundle.js',
        // Specify the library target for Node.js (commonjs2 is typical)
        // libraryTarget: 'commonjs2'
    },

    // Configure how modules are resolved
    // resolve: {
    //     // Add '.js' and '.json' as resolvable extensions.
    //     // This allows you to import modules without specifying their extensions.
    //     extensions: ['.js', '.json']
    // },

    // The crucial part: defining external modules
    // Webpack will not bundle these modules; instead, it will assume they are available
    // in the Node.js environment at runtime (e.g., via require()).

    // Option 1: Manually list specific modules
    // externals: {
    //     // Node.js built-in modules
    //     'fs': 'commonjs fs',
    //     'path': 'commonjs path',
    //     'http': 'commonjs http',
    //     // A hypothetical npm package you don't want to bundle
    //     'lodash': 'commonjs lodash',
    //     'express': 'commonjs express'
    // },

    // Option 2 (Recommended for Node.js): Use webpack-node-externals
    // This utility automatically whitelists all modules in your node_modules directory
    // (except those you explicitly want to bundle, if any).
    // You'll need to install it: `npm install webpack-node-externals --save-dev`
    externals: {
        // Mark '@google/genai' as external.
        // Webpack will replace `require('@google/genai')` with `require('@google/genai')`
        // in the bundled output, expecting Node.js to resolve it at runtime.
        '@google/genai': 'commonjs @google/genai'
        // Note: The correct package name is often '@google/generative-ai' for the Gemini API.
        // If your require statement is literally `require('@google/genai')`, use that instead.
        // '@google/genai': 'commonjs @google/genai'
    },

    // Define module rules (e.g., for Babel to transpile ES6+ to commonjs)
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/, // Apply this rule to .js files
    //             exclude: /node_modules/, // Exclude files in node_modules
    //             use: {
    //                 loader: 'babel-loader', // Use babel-loader for transpilation
    //                 options: {
    //                     // Presets for Babel, e.g., for ES6+ features and Node.js environment
    //                     presets: [
    //                         ['@babel/preset-env', {
    //                             targets: { node: 'current' } // Target the current Node.js version
    //                         }]
    //                     ]
    //                 }
    //             }
    //         }
    //     ]
    // },

    // Optional: Source maps for easier debugging
    // devtool: false,

    // Optional: Mode (development, production, none)
    // 'production' enables optimizations like minification.
    // 'development' provides more detailed error messages and faster compilation.
    mode: 'production' // or 'production'
};
