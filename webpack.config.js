const path = require('path');

// check environment mode
var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

function devProd(development, production) {
    if(environment === "development") {
        return development
    } else {
        return production 
    }
}

module.exports = {
    entry: './src/index.ts',
    devtool: devProd('inline-source-map', false),
    mode: devProd("development", "production"),
    // Typescript
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                options: {
                    search: "__API_URL__",
                    replace: devProd("http://localhost:5000/", "https://www.jonasoesch.ch/mortality/"),
                }
            }
        ]

    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './static'
    },
};

