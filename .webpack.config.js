//importar el modulo path
const path = require('path');

//exportar objeto de configuracion
module.exports = {
    //1. configurando el archivo semilla(indexador) del frontEnd
    entry: "./client/index.js",
    //2. estableciendo archivo de salida
    output: {
        //2.1 ruta absoluta de salida
        path: path.resolve(__dirname,"public"),
        //2.2 nombre de salida
        filename: "bundle.js",
  
    },
    output: {
        // 2.1 Absolute output path
        // Note that it is being placed in the directory
        // of the project's static files
        path: path.resolve(__dirname, "public"),
        // 2.2 Output file name
        filename: "bundle.js"
      },
      // Agregando un modulo a webpack
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        'modules': false,
                        'useBuiltIns': 'usage',
                        'targets': '> 0.25%, not dead',
                        'corejs': 3
                      }
                    ]
                  ]
                }
              }
            ]
          }
        ]
      }
    }
    
    /*
    //3. servidor de desarollo
    devServer: {
        //3.1 Folder de estaticos
        static: path.join(__dirname,'public'),
        //3.2 puerto de servidor de desarollo
        port: 8080,
        //3.3 definiendo el host
        host: '0.0.0.0'
    }
}
*/