import swPaths from './paths';
import swDefinitions from './definitions';
const { paths } = new swPaths();
const { definitions } = new swDefinitions();

let host = 'localhost:' + process.env.PORT

if (process.env.NODE_ENV != 'development') {
  host = process.env.HOST;
}

module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "My Teksun",
    "version": "1.0.0",
    //   "description": "Secret Key : - "+process.env.APISECRETKEY+" \n\n" +
    //   "Private Key : - "+process.env.APIPRIVATEKEY
  },
  "host": host,
  "basePath": "/api",
  "paths": paths,
  "definitions": definitions,
  "responses": {},
  "parameters": {},
  "securityDefinitions": {},
  "tags": []
}
