//cargando depedencia
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var debug = require('debug')('dwpc2:server');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//importado de los midleware de webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// inportando la configuracion de webpack
import webpackConfig from '../webpack.dev.config';
//se importa el debugger
import debug from './services/debugLogger';
//Creando la instancia de express
var app = express();
// modo de ejecucion
const nodeEnviroment = process.env.NODE_ENV || 'production'
//Carga de Webpack
// se decide si se utiliza el middleware o si no se usa
if(nodeEnviroment === 'development'){
  // Start Webpack dev server
  console.log("🛠️  Ejecutando en modo desarrollo");
  debug('✒ Ejecutando en modo de desarrollo 👨‍💻');
  // Se agrega una llave "mode" con valor "development"
  webpackConfig.mode = nodeEnviroment;
  //  Se ve que dev server tenga el mismo valor qye el servidor de express 
  webpackConfig.devServer.port = process.env.PORT;
  // Hot module replacement(implementacion de la carga activa)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
	// Agregar el plugin a la configuración de desarrollo de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // habilita el middleware de webpack
  app.use( WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }) );
  //  Inhabilita el webpack HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log("🏭 Ejecutando en modo producción 🏭");
}

// configura el motor de plantillas
debug(`📣Ruta de app: ${path.join(__dirname,'views')}`);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// se establecen los middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//crea un servidor de archivos estaticos
app.use(express.static(path.join(__dirname,'..','public')));
//registro de middleware de aplicacion
app.use('/', indexRouter);
//activa usersRouter cunado se solicta el recurso raiz users
app.use('/users', usersRouter);

// middleware que toma los errores
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error de render
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
