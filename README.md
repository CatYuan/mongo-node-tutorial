Tutorial for mongoDB and Node.js - using the native driver

- [Connect to MongoDB](#connect-to-mongodb)
- [CRUD](#crud)
  - [Insert a Document](#insert-a-document)
  - [Find a Document](#find-a-document)
  - [Update a Document](#update-a-document)

# Connect to MongoDB

- create a client using `MongoClient(url, options, callback)`
  - `options` is an object
- connect to the server using `connect(function(err) {...})`
- to get access to the database call `client.db(dbName)`
- to end a session call `client.close()`

# CRUD

## Insert a document

- `insertMany(docs[, options][, callback])` - returns Promise
  - @param docs - Array<object> - documents to insert
  - @param options - object - optional settings
    - `wtimeout` - type: number - default: null - specefies a timeout
  - @param callback - type: insertWriteOpCallback - callback
    - insertWriteOpCallback format - function(error, result)
      - @param error - type: MongoError
      - @param result - type: insertWriteOpResult - result object
    - insertWriteOpResult - type: object
      - @prop insertedCount - type: number - num docs inserted
      - @prop ops - type: Array<object> - all docs inserted
      - @props insertedIds - type: Array<object> - all generated \_id's for inserted docs
      - @prop connection - type: object - the connection object used for the operation
      - @prop result - type: object - has 2 properties
        - result.ok - type: boolean
        - result.n - type: number - count of docs inserted
- `insertOne(docs, options, callback)` - similar to insertMany
  - @param docs - type: object - document to insert

## Find a document

- `find(query)` - returns Cursor - props of Cursor: error, count
  - @param query - type: object - the cursor query object
  - an empty object indicates to find all documents stored in the db

## Update a document
# mongo-node-tutorial
