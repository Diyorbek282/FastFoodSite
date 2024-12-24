const newProductBtn = document.getElementById("new_product");
const productForm = document.getElementById("product");
const nameInputProduct = document.getElementById("name_product");
const priceInputProduct = document.getElementById("price_product");
const saveProductBtn = document.getElementById("save_product");
const addProductsContainer = document.getElementById("add_product");

let products = JSON.parse(localStorage.getItem("products")) || [];
let editProductId = false;

newProductBtn.addEventListener("click", () => {
  productForm.classList.remove("hidden");
  nameInputProduct.value = "";
  priceInputProduct.value = "";
  editProductId = false;
});

function setProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function getNextProductId() {
  return products.length ? products[products.length - 1].id + 1 : 1;
}

saveProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputValue = nameInputProduct.value.trim();
  const priceInputValue = priceInputProduct.value.trim();

  if (nameInputValue && priceInputValue) {
    if (editProductId !== false) {
      products[editProductId].name = nameInputValue;
      products[editProductId].price = priceInputValue;
    } else {
      const newProduct = {
        id: getNextProductId(),
        name: nameInputValue,
        price: priceInputValue,
      };
      products.push(newProduct);
    }
    setProducts();
    productForm.classList.add("hidden");
    showProducts();
    nameInputProduct.value = "";
    priceInputProduct.value = "";
    editProductId = false;
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function showProducts() {
  addProductsContainer.innerHTML = "";

  products.forEach((item, i) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "justify-center");
    productDiv.innerHTML = `
        <div class="flex w-5/6">
          <div class="border-2 p-4 w-full text-xl">
            <h1>ID: ${item.id}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1>Nomi: ${item.name}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1>Narxi: ${item.price}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <div class="flex">
              <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editProduct(${i})"/>
              <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteProduct(${i})"/>
            </div>
          </div>
        </div>
      `;
    addProductsContainer.appendChild(productDiv);
  });
}

function editProduct(index) {
  productForm.classList.remove("hidden");
  const productToEdit = products[index];

  editProductId = index;

  nameInputProduct.value = "";
  priceInputProduct.value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  setProducts();
  showProducts();
}
