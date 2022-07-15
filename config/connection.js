// import connect and connection from mongoose
const { connect, connection } = require('mongoose');
const dbName = 'usersDb'

// create the connection string with dbName
const connectionString = `mongodb://localhost/${dbName}`;

// connect to the database
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// export the conneciton
module.exports = connection;