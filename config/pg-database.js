const pgsql = require('pgsql');

const connection = pgsql.createConnection({
    user: 'postgres',
    host: 'localhost',
    database: "db_eis",
    password: "j43l4nur",
    port: process.env.DB_PORT,
});

connection.connect(function (err){
    if (err) throw err;
    console.log("connected");
});
module.exports = connection;