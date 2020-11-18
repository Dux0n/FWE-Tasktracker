const config = {
    type: 'mysql',
    name: "default",
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    synchronize: false,
    logging: false,
    entities: ["./src/entity/*.ts"]
  };
  module.exports = config;
  