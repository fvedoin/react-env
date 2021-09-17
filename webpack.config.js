const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //dá acesso ao código original em caso de erros
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //pode ler arquivos js ou jsx
    resolve: {
        extensions: ['.js', '.jsx']
    },
    //observa as mudanças nos arquivos e cria um servidor estático
    devServer: {
        static: path.resolve(__dirname, 'public')
    },
    //não precisa importar o bundle.js na index.html
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    //como a aplicação vai se comportar ao importar arquivos
    //não precisa mais adicionar a extensão ao importar o arquivo
    module: {
        rules: [
            {
                //expressão regular para ver se termina em .jsx
                test: /\.jsx$/,
                //podemos excluir a node_modules, pois os arquivos de lá já são entendidos pelo browser
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                //expressão regular para ver se termina em .css
                test: /\.scss$/,
                //podemos excluir a node_modules, pois os arquivos de lá já são entendidos pelo browser
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    }
}