const { connect, connection } = require('mongoose');
const dbName = 'usersDb'

const connectionString = `mongodb://localhost/${dbName}`;

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;