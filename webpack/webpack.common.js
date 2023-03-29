const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
            },],
        },
        {
            test: /\.(txt|dat)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/[hash][ext][query]'
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
        }],
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: '[contenthash].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/public/index.html'),
        }),
    ],
    stats: 'errors-only',
    experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true
    }
}