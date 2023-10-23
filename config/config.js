module.exports = {
  development: {
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.DBHOST,
      dialect: process.env.DIALECT
  },
  staging: {
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.DBHOST,
      dialect: process.env.DIALECT
  },
  production: {
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.DBHOST,
      dialect: process.env.DIALECT
  }
};