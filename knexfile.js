module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "url_shortener",
      user: "admin",
      password: "admin",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
