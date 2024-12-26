const orderContainer = document.getElementById("order");

const buyurtmalarBtn = document.getElementById("buyurtmalar");
const mahsulotlarBtn = document.getElementById("mahsulotlar");
const operatorlarBtn = document.getElementById("operatorlar");
const filiallarBtn = document.getElementById("filiallar");

const buyurtmalarSection = document.getElementById("buyurtmalar_section");
const mahsulotlarSection = document.getElementById("mahsulotlar_section");
const operatorlarSection = document.getElementById("operatorlar_section");
const filiallarSection = document.getElementById("filiallar_section");

let extant = true;

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

function closeModal(section) {
  section.classList.add("hidden");
}

function addSome(params) {
  params.classList.remove("hidden");
}

// limit for input number function
const maxLength = 9;
// const minLength = 8;

// function checkInputLength(id) {
//   if (id.value.length > maxLength && id.value.length < minLength) {
//     id.value = id.value.slice(0, maxLength);
//   } else {
//     return;
//   }
// }

function limitInputLength(id) {
  if (id.value.length > maxLength) {
    id.value = id.value.slice(0, maxLength);
  } else {
    return;
  }
}

// function deleteOperator(index) {
//   operators.splice(index, 1);
//   setOperators();
//   showOperators();
// }

// function toggleSwitch() {
//   const toggle = document.getElementById("toggle");
//   const circle = document.getElementById("circle");
//   const text = document.getElementById("text");

//   if (toggle.checked) {
//     extant = true;
//     circle.classList.add("translate-x-6");
//     circle.classList.add("bg-green-500");
//     text.innerHTML = "On";
//   } else {
//     extant = false;
//     circle.classList.remove("translate-x-6");
//     circle.classList.remove("bg-green-500");
//     text.innerHTML = "Off";
//   }
// }
