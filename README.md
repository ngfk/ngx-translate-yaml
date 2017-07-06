# ngx-translate yaml

[![Travis CI](https://travis-ci.org/ngfk/ngx-translate-yaml.svg?branch=master)](https://travis-ci.org/ngfk/ngx-translate-yaml)

* [Demo](https://ngfk.github.io/ngx-translate-yaml/)
* [ngx-translate](https://github.com/ngx-translate/core)
* [file-loader](https://github.com/webpack-contrib/file-loader)
* [yaml-import-loader](https://github.com/ngfk/yaml-import-loader)

## Import parts of the webpack config
```javascript
let languages = fs.readdirSync(path.join(__dirname, 'src', 'i18n'))
  .map(file => path.join(__dirname, 'src', 'i18n', file))
  .filter(path => !fs.statSync(path).isDirectory());

let partialWebpackConfig = {
  entry: {
    main: [
      ...languages,
      path.join(__dirname, 'src', 'main.ts')
    ]
  },

  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/i18n/[name].json' }
          },
          {
            loader: 'yaml-import-loader',
            options: { importRoot: true, output: 'json' }
          }
        ],
        include: path.join(__dirname, 'src', 'i18n')
      }
    ]
  }
}
```