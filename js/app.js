const orderContainer = document.getElementById("order");

const buyurtmalarBtn = document.getElementById("buyurtmalar");
const mahsulotlarBtn = document.getElementById("mahsulotlar");
const operatorlarBtn = document.getElementById("operatorlar");
const filiallarBtn = document.getElementById("filiallar");

const buyurtmalarSection = document.getElementById("buyurtmalar_section");
const mahsulotlarSection = document.getElementById("mahsulotlar_section");
const operatorlarSection = document.getElementById("operatorlar_section");
const filiallarSection = document.getElementById("filiallar_section");

buyurtmalarBtn.addEventListener("click", () => {
  addHiddenClass(buyurtmalarSection);
  showOrders();
  ordersArray();
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
