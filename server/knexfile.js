// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "", // DB password
    database: "quickshift", //Assumed DB is Quickshift
    charset: "utf8",
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  }
};
