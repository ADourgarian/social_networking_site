/**
 * Created by AVALON on 12/10/15.
 */

'use strict'; // allows some ES6 features, see https://nodejs.org/en/docs/es6/

const MONGO_DB = 'mongodb://localhost:27017/andrew'; //Change to your URL

// Retrieve the mongo client
var mongoClient = require('mongodb').MongoClient;

// if WebStorm doesn't like the class keyword, switch to ES6 mode

/**
 * A class that represents the User document in MongoDB
 * @class User
 */
class users {

  static getAll(callback) {

    // connects to MongoDB for us, using the URL we're passing in
    mongoClient.connect(MONGO_DB, function (err, db) {

      // if there is an error connecting, we're just going to pass it back to our callback
      if (err) {
        return callback(err, null);
      }

      // insert user into the collection named 'users'
      var collection = db.collection('users');
      collection.find().toArray(function (err, result) {
        // pass any errors or results to our callback
        return callback(err, result);
      });

    });
  }

  /**
   * Creates a collection of users in the database
   * @static
   * @param users {Array} The array of users to insert into the database
   * @param callback callback {function} Your callback function
   */
  static create(user, callback) {

    // connects to MongoDB for us, using the URL we're passing in
    mongoClient.connect(MONGO_DB, function (err, db) {

      // if there is an error connecting, we're just going to pass it back to our callback
      if (err) {
        return callback(err, null);
      }

      // insert users into the collection named 'users'
      var collection = db.collection('users');

      // using a batch insert for optimal performance
      collection.insert(test, function (err, result) {

        // The documents needs to stick.
        // I'm using the {w:1} option ensure we get the error back if the documents fail to insert correctly.

        // pass any errors or results to our callback
        return callback(err, result);
      });
    });
  }
}

// Makes this class visible to the rest of the application through require
module.exports = users;