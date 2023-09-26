import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",//"123456789KIKI",
  database: "proyecto_node",
});

export default connection;
