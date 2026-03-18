console.log("hola :)");

const itemForm = document.getElementById("item-form");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const itemList = document.getElementById("item-list");
const addButton = document.getElementById("add-button");
const errorText = document.querySelector(".error-text");

const API = "http://localhost:3000/items";

let itemsData = [];
let editingID = null;

//Renderizar la lista
function renderItems(items) {
  if (items.length === 0) {
    itemList.innerHTML = "";
    return;
  }

  itemList.innerHTML = items
    .map(
      (item) => `
    <tr>
      <td class="item-name">${item.name}</td>
      <td class="item-price">$${Number(item.price).toLocaleString("es-CO")}</td>
      <td>
      <button class="btn-edit"   data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" type="button">Editar</button>
      <button class="btn-delete" data-id="${item.id}" type="button">Eliminar</button>
      </td>
      </tr>
  `,
    )
    .join("");

  // Event listeners sobre los botones
  itemList.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", () => deleteItem(Number(btn.dataset.id)));
  });

  itemList.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", () =>
      startEdit(
        Number(btn.dataset.id),
        btn.dataset.name,
        Number(btn.dataset.price),
      ),
    );
  });
}

// GET
fetch(API)
  .then((res) => res.json())
  .then((data) => {
    itemsData = data;
    renderItems(itemsData);
  })
  .catch((err) => console.error("Error al cargar ítems:", err));

// POST
async function addItem(name, price) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    const data = await res.json();
    itemsData.push(data);
    renderItems(itemsData);
  } catch (err) {
    console.error("Error al agregar ítem:", err);
    errorText.textContent =
      "Error al agregar ítem. Por favor, inténtalo de nuevo.";
    setTimeout(() => (errorText.textContent = ""), 3000);
  }
}

//  DELETE
async function deleteItem(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    itemsData = itemsData.filter((item) => item.id !== id);
    renderItems(itemsData);
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    errorText.textContent =
      "Error al eliminar ítem. Por favor, inténtalo de nuevo.";
    setTimeout(() => (errorText.textContent = ""), 3000);
  }
}

//  Preparar edición (llena el form)
function startEdit(id, name, price) {
  editingID = id;
  itemName.value = name;
  itemPrice.value = price;
  addButton.textContent = "Actualizar ítem";
  itemName.focus();
}

// PUT
async function updateItem(id, name, price) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    const updatedItem = await res.json();
    itemsData = itemsData.map((item) => (item.id === id ? updatedItem : item));
    renderItems(itemsData);
  } catch (error) {
    console.error("Error al actualizar ítem:", error);
    errorText.textContent =
      "Error al actualizar ítem. Por favor, inténtalo de nuevo.";
    setTimeout(() => (errorText.textContent = ""), 3000);
  }
}

// Submit
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  const price = Number(itemPrice.value);

  if (editingID !== null) {
    await updateItem(editingID, name, price);
    editingID = null;
    addButton.textContent = "+ Agregar";
  } else {
    await addItem(name, price);
  }

  itemName.value = "";
  itemPrice.value = "";
});
