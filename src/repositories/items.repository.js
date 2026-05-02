const db = require("../utils/firebase");

const collection = db.collection("items");

exports.getAll = async () => {
  const snapshot = await collection.get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

exports.getById = async (id) => {
  const doc = await collection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data()
  };
};

exports.create = async (data) => {
  const ref = await collection.add(data);

  return {
    id: ref.id,
    ...data
  };
};

exports.update = async (id, data) => {
  await collection.doc(id).update(data);

  return {
    id,
    ...data
  };
};

exports.remove = async (id) => {
  await collection.doc(id).delete();
};