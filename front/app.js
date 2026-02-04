console.log("hola :)");

let itemForm = document.getElementById("item-form");
let itemName = document.getElementById("item-name");
let itemPrice = document.getElementById("item-price");
let itemList = document.getElementById("item-list");

let itemsData = [];
let editingID = null;

// Mostrar la lista de items
function renderItems(render) {
  itemList.innerHTML = "";
  render.forEach((item) => {
    itemList.innerHTML += `<div>
        ${item.name} - $${item.price}
        <button id="delete-button-${item.id}" onclick="deleteItem(${item.id})" type="button" > Eliminar</button>
         <button id="update-button-${item.id}" onclick="updateItem(${item.id}, '${item.name}', ${item.price})" type="button" > Editar</button>
        
         </div>`;
  });
}

// Metodo POST para agregar items
async function addItem(name, price) {
  const res = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, price: price }),
  });
  const data = await res.json();

  itemsData.push(data);
  renderItems(itemsData);

  // Limpiar los campos del form
  itemName.value = "";
  itemPrice.value = "";
}

// Metodo DELETE para eliminar items
async function deleteItem(id) {
  const res = await fetch(`http://localhost:3000/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  itemsData = itemsData.filter((item) => item.id !== id);
  renderItems(itemsData);
}

// Metodo PUT para actualizar items
async function updateItem(id, name, price) {
  itemsData = itemsData.filter((item) => item.id !== id);
  itemName.value = name;
  itemPrice.value = price;
  editingID = id;
  document.getElementById("add-button").innerText = "Actualizar Ítem";
}

// Metodo GET para traer los items
fetch("http://localhost:3000/items")
  .then((res) => res.json())
  .then((data) => {
    itemsData = data;
    renderItems(itemsData);
  })
  .catch((err) => console.error(err));

// Submit del botón
itemForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (editingID) {
    // Actualización de item

    const res = await fetch(`http://localhost:3000/items/${editingID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: itemName.value, price: itemPrice.value }),
    });
    const updatedItem = await res.json();
    itemsData = itemsData.map((item) =>
      item.id === editingID ? updatedItem : item,
    );

    editingID = null;
    document.getElementById("add-button").innerText = "Agregar";

    itemsData.push(updatedItem);
    renderItems(itemsData);
  } else {
    await addItem(itemName.value, itemPrice.value);
  }

  renderItems(itemsData);
  itemName.value = "";
  itemPrice.value = "";
});
