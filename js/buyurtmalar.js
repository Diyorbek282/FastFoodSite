const addOrderFunction = document.getElementById("add_order_function");
const saveBtn = document.getElementById("save");
const newOrderBtn = document.getElementById("new_order");
const idOrder = document.getElementById("id_order"); // input
const numberOrder = document.getElementById("number_order"); // input
const countOrder = document.getElementById("count_order"); // input
const addAddOrder = document.getElementById("add-add-order");
const editEditOrder = document.getElementById("edit-edit-order");

let editOrderId = false;

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function setOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getNextOrderId() {
  return orders.length ? orders[orders.length - 1].id + 1 : 1;
}

newOrderBtn.addEventListener("click", () => {
  addAddOrder.classList.remove("hidden");
  editEditOrder.classList.add("hidden");
  orderContainer.classList.remove("hidden");
  editOrderId = false;
  idOrder.value = "";
  numberOrder.value = "";
  countOrder.value = "";
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const idOrderInput = idOrder.value.trim();
  const numberOrderInput = numberOrder.value.trim();
  const countOrderInput = countOrder.value.trim();
  const selectedProductId = document.getElementById("product_order").value;
  const selectedOperatorId = document.getElementById("operator_order").value;
  const selectedFilialId = document.getElementById("filial_order").value;

  if (
    idOrderInput &&
    numberOrderInput &&
    countOrderInput &&
    selectedProductId &&
    selectedOperatorId &&
    selectedFilialId
  ) {
    const selectedProduct = products.find(
      (product) => product.id == selectedProductId
    );
    const selectedOperator = operators.find(
      (operator) => operator.id == selectedOperatorId
    );
    const selectedFilial = fillials.find(
      (filial) => filial.id == selectedFilialId
    );

    if (editOrderId !== false) {
      orders[editOrderId].name = idOrderInput;
      orders[editOrderId].number = numberOrderInput;
      orders[editOrderId].count = countOrderInput;
      orders[editOrderId].selectProductName = selectedProduct.name;
      orders[editOrderId].selectProductPrice = selectedProduct.price;
      orders[editOrderId].selectProductOperator = selectedOperator.name;
      orders[editOrderId].selectProductFilial = selectedFilial.location;
    } else {
      const NewOrder = {
        id: getNextOrderId(),
        name: idOrderInput,
        number: numberOrderInput,
        count: countOrderInput,
        selectProductName: selectedProduct.name,
        selectProductPrice: selectedProduct.price,
        selectProductOperator: selectedOperator.name,
        selectProductFilial: selectedFilial.location,
      };
      orders.push(NewOrder);
      ordersArray();
    }
    setOrders();
    orderContainer.classList.add("hidden");
    showOrders();
    idOrder.value = "";
    numberOrder.value = "";
    countOrder.value = "";

    editOrderId = false;
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function showOrders() {
  addOrderFunction.innerHTML = "";
  orders.forEach((order, i) => {
    addOrderFunction.innerHTML += `
      <div class="flex justify-center">
        <div class="flex w-5/6">
          <div class="border-2 p-4 w-full text-xl">
            <h1>ID: ${order.id}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-user-large"></i> ${order.name}</h1>
            <h1><i class="fa-solid fa-phone"></i> ${order.number}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-burger"></i> ${
              order.selectProductName
            }</h1>
            <h1><i class="fa-solid fa-sack-dollar"></i> ${
              order.selectProductPrice * order.count
            }</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-headset"></i> ${
              order.selectProductOperator
            }</h1>
            <h1><i class="fa-solid fa-shop"></i> ${
              order.selectProductFilial
            }</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <div class="flex">
                <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editOrder(${i})"/>
                <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteOrder(${i})"/>
              </div>
          </div>
        </div>
      </div>
    `;
  });
}

function editOrder(index) {
  const orderToEdit = orders[index];
  // console.log(orderToEdit.selectProductName);
  // console.log(orderToEdit.selectProductOperator);
  // console.log(orderToEdit.selectProductFilial);

  editOrderId = index;
  addAddOrder.classList.add("hidden");
  editEditOrder.classList.remove("hidden");
  idOrder.value = orderToEdit.name;
  numberOrder.value = orderToEdit.number;
  countOrder.value = orderToEdit.count;
  // (selectedProduct = orderToEdit.selectProductName),
  //   (selectedOperator = orderToEdit.selectProductOperator),
  //   (selectedFilial = orderToEdit.selectProductFilial),
  orderContainer.classList.remove("hidden");
}

function deleteOrder(index) {
  orders.splice(index, 1);
  setOrders();
  showOrders();
}

// Product function
const productOrder = document.getElementById("product_order");

function productsArr() {
  productOrder.innerHTML = "";
  const disabledOption = document.createElement("option");
  disabledOption.textContent = "Menu";
  disabledOption.hidden = true;
  disabledOption.disabled = true;
  disabledOption.selected = true;
  productOrder.appendChild(disabledOption);
  products.forEach((product) => {
    const productOption = document.createElement("option");
    productOption.value = product.id;
    productOption.textContent = product.name;
    productOrder.appendChild(productOption);
  });
}

// Operator function
const operatorOrder = document.getElementById("operator_order");

function operatorsArr() {
  operatorOrder.innerHTML = "";
  const disabledOption = document.createElement("option");
  disabledOption.textContent = "Operator";
  disabledOption.hidden = true;
  disabledOption.disabled = true;
  disabledOption.selected = true;
  operatorOrder.appendChild(disabledOption);
  operators.forEach((operator) => {
    const operatorOption = document.createElement("option");
    operatorOption.value = operator.id;
    operatorOption.textContent = operator.name;
    operatorOrder.appendChild(operatorOption);
  });
}

// Filial function
const filialOrder = document.getElementById("filial_order");

function filialsArr() {
  filialOrder.innerHTML = "";
  const disabledOption = document.createElement("option");
  disabledOption.textContent = "Filial";
  disabledOption.hidden = true;
  disabledOption.disabled = true;
  disabledOption.selected = true;
  filialOrder.appendChild(disabledOption);
  fillials.forEach((filial) => {
    const filialOption = document.createElement("option");
    filialOption.value = filial.id;
    filialOption.textContent = filial.location;
    filialOrder.appendChild(filialOption);
  });
}

function ordersArray() {
  filialsArr();
  operatorsArr();
  productsArr();
}
