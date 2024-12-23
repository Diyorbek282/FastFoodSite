const saveBtn = document.getElementById("save");
const orderContainer = document.getElementById("order");
const addOrderFunction = document.getElementById("add_order_function");

const newOrderBtn = document.getElementById("new_order");

const buyurtmalarBtn = document.getElementById("buyurtmalar");
const mahsulotlarBtn = document.getElementById("mahsulotlar");
const operatorlarBtn = document.getElementById("operatorlar");
const filiallarBtn = document.getElementById("filiallar");

const buyurtmalarSection = document.getElementById("buyurtmalar_section");
const mahsulotlarSection = document.getElementById("mahsulotlar_section");
const operatorlarSection = document.getElementById("operatorlar_section");
const filiallarSection = document.getElementById("filiallar_section");

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
  showFillials();
});

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
