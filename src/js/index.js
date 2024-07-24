import {
  getProductsAsync,
  createProductAsync,
  deleteProductAsync,
} from "./productService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProductsAsync();
  products.forEach((product) => {
    renderProductCard(product.id, product.name, product.image, product.price);
  });
});

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", handleFormSubmitAsync);

async function handleFormSubmitAsync(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value;

  const product = await createProductAsync(name, image, price);
  renderProductCard(product.id, product.name, product.image, product.price);

  e.target.reset();
}

function renderProductCard(id, name, image, price) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.dataset.id = id;
  productCard.innerHTML = `
  <div class="product-card-photo">
    <img src="${image}" alt="Imagem de ${name}">
  </div>
  <span>${name}</span>
  <div class="product-details">
    <span>${formatPrice(price)}</span>
    <button class="btn-icon-trash">
      <img src="src/assets/icons/icon_trash.svg" alt="Ícone de lixeira para excluir produto">
    </button>
  </div>
  `;

  const productCardList = document.querySelector(".product-card-list");
  productCardList.appendChild(productCard);

  const btnIconTrashList = document.querySelectorAll(".btn-icon-trash");
  btnIconTrashList.forEach((btnIconTrash) => {
    btnIconTrash.addEventListener("click", handleRemoveProductCardAsync);
  });
}

async function handleRemoveProductCardAsync(e) {
  const card = e.target.closest(".product-card");
  const productId = card.dataset.id;

  await deleteProductAsync(productId);
  card.parentElement.removeChild(card);
}

function formatPrice(value) {
  const floatValue = parseFloat(value);

  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(floatValue);

  // Adiciona o espaço entre o símbolo da moeda e o valor
  return formattedCurrency.replace(/\$/, "$ ");
}
