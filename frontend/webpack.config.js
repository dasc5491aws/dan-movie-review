module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
        movieDetails: './src/js/movieDetails.js',
        addMovie: './src/js/addMovie.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build',
    },
    devServer: {
        contentBase: __dirname + '/build',
        compress: true,
        port: 9000
    }
};