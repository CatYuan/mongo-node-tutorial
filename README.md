# mongo-node-tutorial

Tutorial for mongoDB and Node.js - using the native driver

- [Connect to MongoDB](#connect-to-mongodb)
- [CRUD](#crud)
  - [Insert a Document](#insert-a-document)
  - [Find a Document](#find-a-document)
  - [Update a Document](#update-a-document)
  - [Remove a Document](#remove-a-document)

# Connect to MongoDB

- create a client using `MongoClient(url, options, callback)`
  - `options` is an object
- connect to the server using `connect(function(err) {...})`
- to get access to the database call `client.db(dbName)`
- to end a session call `client.close()`

# CRUD

## Insert a document

- `insertMany(docs[, options][, callback])` - returns Promise
- `insertOne(docs[, options][, callback])` - similar to insertMany
  - @param docs - type: object - document to insert
  - @param docs - `Array<object>` - documents to insert
  - @param options - object - optional settings
    - `wtimeout` - type: number - default: null - specefies a timeout
    - @param callback - type: insertWriteOpCallback - callback

### insertWriteOpCallback

format - function(error, result)

- @param error - type: MongoError
- @param result - type: insertWriteOpResult - result object
- insertWriteOpResult - type: object
- @prop insertedCount - type: number - num docs inserted
- @prop ops - type: `Array<object>` - all docs inserted
- @props insertedIds - type: `Array<object>` - all generated \_id's for serted docs
- @prop connection - type: object - the connection object used for the operation
- @prop result - type: object - has 2 properties
  - result.ok - type: boolean
  - result.n - type: number - count of docs inserted

## Find a document

- `find(query)` - returns Cursor - props of Cursor: error, count
  - @param query - type: object - the cursor query object
  - an empty object indicates to find all documents stored in the db

## Update a document

- `updateMany(filter, update[, options][, callback])` - returns a Promise
  - @param filter - type: object - filter used to select document to update
  - @param update - type: object - the update operations to be applied to the document
    - [update object is either a document or pipeline](#update-document-or-pipeline)
  - @param options - type: object - optional settings
    - `upsert` - an option if set to true, creates a new doc when no doc matches the query criteria
  - @param callback - type: updateWriteOpCallback - callback
    - updateWriteOpCallback format - function(error, result)
      - @param error - type: Mongo Error
      - @param result - type: updateWriteOpResult - result object
    - updateWriteOpResult - type: object
      - @prop result - type: object
        - result.ok - type: boolean
        - result.n - number of documents scanned
        - result.nModified - number of documents modified
      - @prop connection - type object - the connection used for the operation
      - @prop matchedCount - type Number
      - @prop modifiedCount - type: Number
      - @prop upsertedCount - type: Number
      - @prop upsertedId - type: object
- `updateOne(filter, update[, options][, callback])`

### update document or pipeline

can be one of the following

1. update document - contains only update operator expressions

```
// update operator expressions
{
  <operator1>:{ <field1>:<value1>, ...},
  <operator2>:{ <field2>:<value2>, ...},
  ...
}
```

- different operators
  - \$inc - increments the value by the specified amount
  - \$min - only updates the field if the value is less than the existing field value
  - \$max - similar to min
  - \$mul - multiplies the value by the specfied amount
  - \$rename - renames a field
  - \$set - sets the value of a field
  - \$unset - removes the field from the document

2. replacement document - contains only `<field1>: <value1>` pairs
3. Aggregation pipeline

- different pipeline operators
  - \$set
  - \$unset
  - \$replaceWith

## Remove a document

- `deleteMany(filter[, options][, callback])` - returns Promise
  - @param filter - type: object - filter used to select the documents to remove
  - @param options - type: object
  - @param callback - type: deleteWriteOpCallback
    - deleteWriteOpCallback - function(error, result)
      - @param error - type: MongoError
      - @param result - type: deleteWriteOpResult
    - deleteWriteOpResult
      - @prop result - type: object
        - result.ok - type: boolean
        - result.n - type: number
      - @prop connection - connection object used for operation
      - @prop deletedCount - type: number
- `deleteOne(filter[, options][, callback])`
