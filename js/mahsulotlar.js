const newProductBtn = document.getElementById("new_product");
const productForm = document.getElementById("product");
const nameInputProduct = document.getElementById("name_product");
const priceInputProduct = document.getElementById("price_product");
const saveProductBtn = document.getElementById("save_product");
const addProductsContainer = document.getElementById("add_product");
const addAddProduct = document.getElementById("add-add-product");
const editEditProduct = document.getElementById("edit-edit-product");
let extantProduct = true;
let editProductId = false;
let products = JSON.parse(localStorage.getItem("products")) || [];

newProductBtn.addEventListener("click", () => {
  addAddProduct.classList.remove("hidden");
  editEditProduct.classList.add("hidden");
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
      products[editProductId].extant = extantProduct;
    } else {
      const newProduct = {
        id: getNextProductId(),
        name: nameInputValue,
        price: priceInputValue,
        extant: extantProduct,
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
    productDiv.innerHTML = `<div class="flex w-5/6">
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
            <img
              class="cursor-pointer transition-all duration-500 hover:scale-110"
              src="./edit.svg"
              width="25"
              height="25"
              onclick="editProduct(${i})"
            />
          </div>
        </div>
      <div class="border-2 p-4 w-full text-xl">
            <label class="switch">
           <input onclick="switchBtnP(${item.id - 1})" 
           type="checkbox" ${item.extant ? "checked" : ""}>
            <span class="slider round"></span>
            </label>
</div>



      </div>`;
    addProductsContainer.appendChild(productDiv);
  });
}

function editProduct(index) {
  productForm.classList.remove("hidden");
  const productToEdit = products[index];
  addAddProduct.classList.add("hidden");
  editEditProduct.classList.remove("hidden");
  editProductId = index;
  nameInputProduct.value = products[editProductId].name;
  priceInputProduct.value = products[editProductId].price;
}

function switchBtnP(i) {
  if (products[i].extant === true) {
    products[i].extant = false;
    setProducts();
  } else {
    products[i].extant = true;
    setProducts();
  }
}

// function toggleSwitch(button, i, e) {
//   e.preventDefault();
//   if (products[i].extant === true) {
//     button.innerHTML = "On";
//     button.classList.remove("bg-black");
//     button.classList.add("bg-green-500");
//     products[i].extant = false;
//     setProducts();
//   } else {
//     button.innerHTML = "Off";
//     button.classList.add("bg-black");
//     button.classList.remove("bg-green-500");
//     products[i].extant = true;
//     setProducts();
//   }
// }

// function innerName(i) {
//   if (products[i].extant === true) {
//     button.innerHTML = "On";
//     button.classList.remove("bg-black");
//     button.classList.add("bg-green-500");
//   } else {
//     button.innerHTML = "Off";
//     button.classList.add("bg-black");
//     button.classList.remove("bg-green-500");
//   }
// }
