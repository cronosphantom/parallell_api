
let host = process.env.DB_HOST;
let username = "edrivenadmin";
let password = "Tirefoam2005!!!!!";
let database = "parallell_dev";
let synchronize = true;

if (process.env.NODE_ENV === "local_development") {
   host = "localhost";
  // username = "root";
  // password = "myLocalP@ssword!";
   username = "postgres";
   // password = "1234";
   password = "admin123";
   database = "parallel";
   synchronize = true;
}

module.exports = {
   "type": "postgres",
   "host": host,
   "port": 5432,
   "username": username,
   "password": password,
   "database": database,
   "synchronize": synchronize,
   "entities": [
      "src/models/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
