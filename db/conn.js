const { MongoClient } = require('mongodb');
// Usamos DIRECTAMENTE la variable de tu Atlas de MongoDB
const mongoURL = process.env.ATLAS_URI;

if (!mongoURL) {
  console.error('Error crítco: La variable de entorno ATLAS_URI no está definida.');
  process.exit(1);
}

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('ejemplo');
      console.log('Successfully connected to MongoDB Atlas.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};