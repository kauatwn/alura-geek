export async function getProductsAsync() {
  const response = await fetch("http://localhost:3000/products", {
    method: "GET",
  });
  return await response.json();
}

export async function createProductAsync(name, image, price) {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, price }),
  });

  return await response.json();
}

export async function deleteProductAsync(productId) {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "DELETE",
  });

  return await response.json();
}
