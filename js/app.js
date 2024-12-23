const newOrderBtn = document.getElementById("new_order");
const saveBtn = document.getElementById("save");
const orderContainer = document.getElementById("order");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const addOrderFunction = document.getElementById("add_order_function");
const buyurtmalarBtn = document.getElementById("buyurtmalar");
const mahsulotlarBtn = document.getElementById("mahsulotlar");
const operatorlarBtn = document.getElementById("operatorlar");
const filiallarBtn = document.getElementById("filiallar");

const buyurtmalarSection = document.getElementById("buyurtmalar_section");
const mahsulotlarSection = document.getElementById("mahsulotlar_section");
const operatorlarSection = document.getElementById("operatorlar_section");
const filiallarSection = document.getElementById("filiallar_section");

const addProductBtn = document.getElementById("add_product");
const productContainer = document.getElementById("product");
const newProductBtn = document.getElementById("new_product");
const saveProductBtn = document.getElementById("save_product");
const priceProductInput = document.getElementById("price_product");
const nameProductInput = document.getElementById("name_product");
const editFormProduct = document.getElementById("edit-product");
const editPriceInput = document.getElementById("edit-price");
const editNameInput = document.getElementById("edit-name");
const resetForm = document.getElementById("order_save");
const closeEl = document.getElementById("closeEl");
let editItemId;
let products = JSON.parse(localStorage.getItem("products")) || [];

function setProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

newProductBtn.addEventListener("click", () => {
  productContainer.classList.remove("hidden");
});

saveProductBtn.addEventListener("click", (e) => {
  const productInput = nameProductInput.value;
  const priceInput = priceProductInput.value;
  e.preventDefault();
  if (productInput.trim() && priceInput.trim()) {
    addProductToLocalStorage();
    productContainer.classList.add("hidden");
    showProducts();
    nameProductInput.value = "";
    priceProductInput.value = "";
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

const createNewOrder = () => {
  addOrderFunction.innerHTML += `
    <div class="flex justify-center">
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: </h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1><i class="fa-solid fa-user-large"></i> Javohir</h1>
          <h1><i class="fa-solid fa-phone"></i> +998914184415</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1><i class="fa-solid fa-burger"></i> Hot-Dog</h1>
          <h1><i class="fa-solid fa-sack-dollar"></i> 22000</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1><i class="fa-solid fa-headset"></i> Diyorbek</h1>
          <h1><i class="fa-solid fa-shop"></i> Buxoro</h1>
        </div>
      </div>
    </div>
  `;
};

buyurtmalarBtn.addEventListener("click", () => {
  addHiddenClass(buyurtmalarSection);
});

mahsulotlarBtn.addEventListener("click", () => {
  addHiddenClass(mahsulotlarSection);
  showProducts();
});

operatorlarBtn.addEventListener("click", () => {
  addHiddenClass(operatorlarSection);
  showOperators();
});

filiallarBtn.addEventListener("click", () => {
  addHiddenClass(filiallarSection);
});

editFormProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const productInput = editNameInput.value;
  const priceInput = editPriceInput.value;
  if (productInput.trim() && priceInput.trim()) {
    updateProduct();
    showProducts();
    closeModal();
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

// Modal & Overlay Functions
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeEl.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Show Products Function
function showProducts() {
  addProductBtn.innerHTML = "";

  products.forEach((item, i) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "justify-center");
    productDiv.innerHTML = `
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: ${item.id}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Mahsulot nomi: ${item.name}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Mahsulot narxi: ${item.price}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <div class="flex">
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editProduct(${i})"/>
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteProduct(${i})"/>
          </div>
        </div>
      </div>
    `;
    addProductBtn.appendChild(productDiv);
  });
}

function getNextProductId() {
  return products.length ? products[products.length - 1].id + 1 : 1;
}

// Add Product to Local Storage
function addProductToLocalStorage() {
  const productInput = nameProductInput.value;
  const priceInput = priceProductInput.value;

  const newProduct = {
    id: getNextProductId(),
    name: productInput,
    price: priceInput,
  };

  products.push(newProduct);
  setProducts();
}

// Delete Product
function deleteProduct(index) {
  products.splice(index, 1);
  setProducts();
  showProducts();
}

// Edit Product
function editProduct(index) {
  const product = products[index];
  openModal();
  editItemId = index;
  editNameInput.value = "";
  editPriceInput.value = "";
}

function updateProduct() {
  const productInput = editNameInput.value;
  const priceInput = editPriceInput.value;

  products[editItemId].name = productInput;
  products[editItemId].price = priceInput;

  setProducts();
}

const sectionsArr = [
  buyurtmalarSection,
  mahsulotlarSection,
  operatorlarSection,
  filiallarSection,
];

const addHiddenClass = (section) => {
  sectionsArr.forEach((sec) => sec.classList.add("hidden"));
  section.classList.remove("hidden");
};

newOrderBtn.addEventListener("click", () => {
  orderContainer.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  orderContainer.classList.add("hidden");
  createNewOrder();
});
