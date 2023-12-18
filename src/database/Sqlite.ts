import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
export const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to sqlite db.");

  //Create Form table
  db.run(
    "CREATE TABLE form(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, phoneNumber TEXT, notes TEXT)",
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log("Success created form table");
    }
  );

  //Create user table
  db.run(
    "CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)",
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log("Success created user table");

      //Seed admin user data
      db.run("INSERT INTO user(username,password) VALUES (?,?)", [
        "admin",
        bcrypt.hashSync("default", 10),
      ]);
    }
  );
});
