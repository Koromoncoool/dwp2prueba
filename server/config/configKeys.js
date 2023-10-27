// importando el DotEnv
import dotenv from "dotenv";

// Invocacion a la funcion config de la instancia dotenv
dotenv.config();

console.log(process.env.PORT);

// Creando objetos de configuracion
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || "0.0.0.0",
};
const devConfig = {
  MONGO_URL: process.env.DEV_DATABASE_URL,
};

const testConfig = {
  TEST_VALUE: 200,
};

const prodConfig = {
  MONGO_URL: process.env.PROD_DATABASE_URL,
};
// exportar el el obejto de configuracion
// Crando una funcion selectora
function getEnvConfig(env) {
  switch (env) {
    case "production":
      return prodConfig;

    case "development":
      return devConfig;

    case "test":
      return testConfig;

    default:
      return prodConfig;
  }
}
export default {
  // spread
  ...defaultConfig,
  ...getEnvConfig(process.env.NODE_ENV),
};
