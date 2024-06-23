const { createConnection } = require("typeorm");
require("dotenv").config();

async function connectDatabase() {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.MYSQL_HOST || "mysql-service", 
      //host: process.env.MYSQL_HOST || "db", 
      //host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT || 3306,
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "root",
      entities: ["models/*.js"],
      synchronize: true,
      database: process.env.MYSQL_DATABASE || "medirendez",
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
}

module.exports = connectDatabase;
