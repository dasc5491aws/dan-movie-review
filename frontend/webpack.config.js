module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        movie: './src/js/movie.js'
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
        contentBase: __dirname,
        compress: true,
        port: 9000
    }
};