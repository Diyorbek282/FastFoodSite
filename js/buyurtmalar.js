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
  const numberOrderInput = numberOrder.value;
  const countOrderInput = countOrder.value.trim();
  const selectedProductId = document.getElementById("product_order").value;
  const selectedOperatorId = document.getElementById("operator_order").value;
  const selectedFilialId = document.getElementById("filial_order").value;
  if (
    idOrderInput &&
    numberOrderInput.length === 9 &&
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
      orders[editOrderId].selectProductName = selectedProduct.id;
      orders[editOrderId].selectProductPrice = selectedProduct.id;
      orders[editOrderId].selectProductOperator = selectedOperator.id;
      orders[editOrderId].selectProductFilial = selectedFilial.id;
    } else {
      const NewOrder = {
        id: getNextOrderId(),
        name: idOrderInput,
        number: numberOrderInput,
        count: countOrderInput,
        selectProductName: selectedProduct.id,
        selectProductPrice: selectedProduct.id,
        selectProductOperator: selectedOperator.id,
        selectProductFilial: selectedFilial.id,
        currentTime: getNowTime(),
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
    alert("Siz hali to'ldirmadingiz yoki raqamni xato to'ldirdingiz!!!");
  }
});

function showOrders() {
  addOrderFunction.innerHTML = "";
  orders.forEach((order, i) => {
    addOrderFunction.innerHTML += `
      <div class="flex justify-center" id="order-${i}"> <!-- Add a unique ID for each order -->
        <div class="flex w-5/6">
          <div class="border-2 p-4 w-full text-xl">
            <h1>ID: ${order.id}</h1>
            <h1><i class="fa-regular fa-clock"></i> Time: ${
              order.currentTime
            }</h1>
            <h1 class="order-item">${orderDone(i)}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-user-large"></i> ${order.name}</h1>
            <h1><i class="fa-solid fa-phone"></i> ${order.number}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-burger"></i> ${ArrayId(
              order.selectProductName,
              products
            )}</h1>
            <h1><i class="fa-solid fa-sack-dollar"></i> ${ArrayIdCalcl(
              order.selectProductPrice,
              products,
              order.count
            )}</h1>
          </div>
          <div class="border-2 p-4 w-full text-xl">
            <h1><i class="fa-solid fa-headset"></i> ${ArrayIdOper(
              order.selectProductOperator,
              operators
            )}</h1>
            <h1><i class="fa-solid fa-shop"></i> ${ArrayIdFilial(
              order.selectProductFilial,
              fillials
            )}</h1>
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
  selectedProduct = orderToEdit.selectProductName;
  selectedOperator = orderToEdit.selectProductOperator;
  selectedFilial = orderToEdit.selectProductFilial;
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
    if (product.extant === true) {
      const productOption = document.createElement("option");
      productOption.value = product.id;
      productOption.textContent = product.name;
      productOrder.appendChild(productOption);
    }
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
    if (operator.extant === true) {
      const operatorOption = document.createElement("option");
      operatorOption.value = operator.id;
      operatorOption.textContent = operator.name;
      operatorOrder.appendChild(operatorOption);
    }
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
    if (filial.extant === true) {
      const filialOption = document.createElement("option");
      filialOption.value = filial.id;
      filialOption.textContent = filial.location;
      filialOrder.appendChild(filialOption);
    }
  });
}

function ordersArray() {
  filialsArr();
  operatorsArr();
  productsArr();
}

function ArrayIdFilial(order, objects) {
  for (const object of objects) {
    if (object.id === order) {
      return object.location;
    }
  }
  return null;
}

function ArrayIdOper(order, objects) {
  for (const object of objects) {
    if (object.id === order) {
      return object.name;
    }
  }
  return null;
}

function ArrayId(order, objects) {
  for (const object of objects) {
    if (object.id === order) {
      return object.name;
    }
  }
  return null;
}

function ArrayIdCalcl(order, objects, count) {
  for (const object of objects) {
    if (object.id === order) {
      return `${count}x${object.price} = ${count * object.price}`;
    }
  }
  return null;
}

function getNowTime() {
  const getTime = new Date();
  const hours =
    getTime.getHours() < 10 ? "0" + getTime.getHours() : getTime.getHours();
  const minutes =
    getTime.getMinutes() < 10
      ? "0" + getTime.getMinutes()
      : getTime.getMinutes();
  const seconds =
    getTime.getSeconds() < 10
      ? "0" + getTime.getSeconds()
      : getTime.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

setInterval(() => {
  orders.forEach((order, i) => {
    orderDone(i);
  });
}, 1000);

function orderDone(i) {
  const getTime = new Date();
  let timeZ = `<p>xatolik</p>`;

  const hoursInSeconds = getTime.getHours() * 3600;
  const minutesInSeconds = getTime.getMinutes() * 60;
  const seconds = getTime.getSeconds();

  let timeString = orders[i].currentTime;
  let [hoursS, minutesS, secondsS] = timeString.split(":");
  let hoursNum = Number(hoursS) * 3600 + 10800;
  let minutesNum = Number(minutesS) * 60;
  let secondsNum = Number(secondsS);

  let term = hoursNum + minutesNum + secondsNum;
  const currentTimeInSeconds = hoursInSeconds + minutesInSeconds + seconds;
  const leftTime = term - currentTimeInSeconds;

  if (leftTime >= 0) {
    const hoursRemaining = Math.floor(leftTime / 3600);
    const minutesRemaining = Math.floor((leftTime % 3600) / 60);
    const secondsRemaining = leftTime % 60;
    timeZ = `<i class="fa-solid fa-stopwatch"></i> Term:<p class="text-green-500">${
      hoursRemaining < 10 ? "0" + hoursRemaining : hoursRemaining
    }:${minutesRemaining < 10 ? "0" + minutesRemaining : minutesRemaining}:${
      secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining
    }</p>`;
  } else {
    const ThanTime = currentTimeInSeconds - term;
    let timeH = Math.floor(ThanTime / 3600);
    let timeM = Math.floor((ThanTime % 3600) / 60);
    let timeS = ThanTime % 60;
    timeZ = `<i class="fa-solid fa-stopwatch"></i> Term:<p class="text-red-500">-${
      timeH < 10 ? "0" + timeH : timeH
    }:${timeM < 10 ? "0" + timeM : timeM}:${
      timeS < 10 ? "0" + timeS : timeS
    }</p>`;
  }

  const orderItemElement = document.querySelector(`#order-${i} .order-item`);
  if (orderItemElement) {
    orderItemElement.innerHTML = timeZ;
  }
}
