const repository = require("../repositories/items.repository");
const webhookService = require("./webhook.service");

exports.getItems = async () => {
  return await repository.getAll();
};

exports.getItemById = async (id) => {
  return await repository.getById(id);
};

exports.createItem = async (data) => {

  const itemData = {
    name: data.name,
    price: Number(data.price),

    createdAt: new Date().toISOString(),

    automation: {
    status: "processing"
    }
  };

  const item = await repository.create(itemData);

  // background webhook
  webhookService
    .sendItemCreatedWebhook(item)
    .then(() => {
      console.log("Webhook enviado");
    })
    .catch((err) => {
      console.error("Error webhook:", err);
    });

  return item;
};

exports.updateItem = async (id, data) => {

  return await repository.update(id, {
    name: data.name,
    price: Number(data.price)
  });

};

exports.deleteItem = async (id) => {
  await repository.remove(id);
};