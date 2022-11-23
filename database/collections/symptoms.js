const mongo = require("../mongo");

const columnName = "symptoms";

export const Symptoms = mongo.db().collection(columnName);

export const init = async () => {
  // 1. Collection Init
  const columns = mongo.db().listCollections({ nameOnly: true }).toArray();
  const columnFound = (await columns).find((column) => column.name === columnName);

  if (!columnFound) {
    await mongo.db().createCollection(columnName);
  }

  // 2. Create Indexes
  // await mongo.db().collection(columnName).createIndexes([]);
  // 3. Create Schema
  await mongo.db().command({
    collMod: columnName,
    validator: {
      $jsonSchema: {
        additionalProperties: false,
        bsonType: 'object',
        required: ['_id'],
        properties: {
          _id: { bsonType: 'string' },
          symptom: { bsonType: 'string' },
        }
      }
    }
  })
}