const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const db = mongoose.connect(process.env.DB_CONNECTION, { 
    // remove support for several connection options that are no longer relevant with the new topology engine: autoReconnect.
    useUnifiedTopology: true,
    // allow users to fall back to the old parser if they find a bug in the new parser.
    useNewUrlParser: true,
 }); 
 // export db
 module.exports = db;