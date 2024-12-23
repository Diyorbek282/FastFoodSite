// const addProductBtn = document.getElementById("add_product");
// const productContainer = document.getElementById("product");
// const newProductBtn = document.getElementById("newProduct");
// const saveProductBtn = document.getElementById("save_product");
// const priceProductInput = document.getElementById("price_product");
// const nameProductInput = document.getElementById("name_product");
// const editFormProduct = document.getElementById("edit-product");
// const editPriceInput = document.getElementById("edit-price");
// const editNameInput = document.getElementById("edit-name");
// let editItemId;

// editFormProduct.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const productInput = editNameInput.value;
//   const priceInput = editPriceInput.value;
//   if (productInput.trim() && priceInput.trim()) {
//     updateProduct();
//     showProducts();
//     closeModal();
//   } else {
//     alert("Siz hali to'ldirmadingiz");
//   }
// });

// // Show Products Function
// function showProducts() {
//   addProductBtn.innerHTML = "";

//   products.forEach((item, i) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("flex", "justify-center");
//     productDiv.innerHTML = `
//         <div class="flex w-5/6">
//           <div class="border-2 p-4 w-full text-xl">
//             <h1>ID: ${item.id}</h1>
//           </div>
//           <div class="border-2 p-4 w-full text-xl">
//             <h1>Mahsulot nomi: ${item.name}</h1>
//           </div>
//           <div class="border-2 p-4 w-full text-xl">
//             <h1>Mahsulot narxi: ${item.price}</h1>
//           </div>
//           <div class="border-2 p-4 w-full text-xl">
//             <div class="flex">
//               <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editProduct(${i})"/>
//               <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteProduct(${i})"/>
//             </div>
//           </div>
//         </div>
//       `;
//     addProductBtn.appendChild(productDiv);
//   });
// }

// function getNextProductId() {
//   return products.length ? products[products.length - 1].id + 1 : 1;
// }

// function addProductToLocalStorage() {
//   const productInput = nameProductInput.value;
//   const priceInput = priceProductInput.value;

//   const newProduct = {
//     id: getNextProductId(),
//     name: productInput,
//     price: priceInput,
//   };

//   products.push(newProduct);
//   setProducts();
// }

// // Delete Product
// function deleteProduct(index) {
//   products.splice(index, 1);
//   setProducts();
//   showProducts();
// }

// // Edit Product
// function editProduct(index) {
//   const product = products[index];
//   openModal();
//   editItemId = index;
//   editNameInput.value = "";
//   editPriceInput.value = "";
// }

// function updateProduct() {
//   const productInput = editNameInput.value;
//   const priceInput = editPriceInput.value;

//   products[editItemId].name = productInput;
//   products[editItemId].price = priceInput;

//   setProducts();
// }

const newProduct = document.getElementById("new_product");
const product = document.getElementById("product");
const nameInput = document.getElementById("name_product");
const numberInput = document.getElementById("price_product");
const saveProducts = document.getElementById("save_products");
const addProducts = document.getElementById("add_products");
let products = JSON.parse(localStorage.getItem("products")) || [];
let editProductId = null;

function setProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

newProduct.addEventListener("click", () => {
  product.classList.remove("hidden");
  nameInput.value = "";
  numberInput.value = "";
  editProductId = null;
});

function getNextProductId() {
  return products.length ? products[products.length - 1].id + 1 : 1;
}

function addproductToLocalStorage() {
  const nameInputValue = nameInput.value;
  const numberInputValue = numberInput.value;

  const newProduct = {
    id: getNextProductId(),
    name: nameInputValue,
    num: numberInputValue,
  };

  products.push(newProduct);
  setProducts();
}

function showProducts() {
  addProducts.innerHTML = "";

  products.forEach((item, i) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "justify-center");
    productDiv.innerHTML = `
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: ${item.id}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>product Ismi: ${item.name}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>product Raqami: ${item.num}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <div class="flex">
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editproduct(${i})"/>
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteproduct(${i})"/>
          </div>
        </div>
      </div>
    `;
    addProducts.appendChild(productDiv);
  });
}

function editProduct(index) {
  product.classList.remove("hidden");
  const productToEdit = products[index];

  editProductId = index;

  nameInput.value = "";
  numberInput.value = "";
}

saveProducts.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputValue = nameInput.value;
  const numberInputValue = numberInput.value;

  if (nameInputValue.trim() && numberInputValue.trim()) {
    if (editProductId !== null) {
      products[editProductId].name = nameInputValue;
      products[editProductId].num = numberInputValue;
    } else {
      addProductToLocalStorage();
    }
    setProducts();
    product.classList.add("hidden");
    showProducts();
    nameInput.value = "";
    numberInput.value = "";
    editProductId = null;
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function deleteProduct(index) {
  products.splice(index, 1);
  setProducts();
  showProducts();
}
