const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "myproject";
/**
 * {useNewUrlParser: true, useUnifiedTopology: true} -
 *    options that use the new Node driver to avoid depreciation warnings
 * @param url - String - connection URI string
 * @param options - Object - optional settings
 * @param callback - Function - command result callback
 * MongoClient(url, options, callback)
 */
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  assert.equal(null, err);
  console.log("successful connection to server");

  const db = client.db(dbName);

  removeDocuments(db, function () {
    findDocuments(db, function () {
      client.close();
    });
  });
});

const insertDocuments = function (db, callback) {
  const collection = db.collection("documents");
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents inot the collection");
    callback(result);
  });
};

const findDocuments = function (db, callback) {
  const collection = db.collection("documents");
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("found the following records");
    console.log(docs);
    callback(docs);
  });
};

const updateDocument = function (db, callback) {
  const collection = db.collection("documents");
  collection.updateOne({ a: 10 }, { $unset: { b: 0 } }, function (err, result) {
    assert.equal(err, null);
    console.log("Updated the document with the field equal to 2");
    callback(result);
  });
};

const removeDocuments = function (db, callback) {
  const collection = db.collection("documents");
  collection.deleteMany({}, function (err, result) {
    assert.equal(err, null);
    console.log("Deleted all documents");
    callback(result);
  });
};
