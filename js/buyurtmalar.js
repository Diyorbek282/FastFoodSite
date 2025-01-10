const addOrderFunction = document.getElementById("add_order_function");
const saveBtn = document.getElementById("save");
const newOrderBtn = document.getElementById("new_order");
const idOrder = document.getElementById("id_order"); // input
const numberOrder = document.getElementById("number_order"); // input
const countOrder = document.getElementById("count_order"); // input
const addAddOrder = document.getElementById("add-add-order");
const editEditOrder = document.getElementById("edit-edit-order");
const NewOrderList = document.getElementById("NewOrderList");
let editOrderId = false;

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function setOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getNextOrderId() {
  return orders.length ? orders[orders.length - 1].id + 1 : 1;
}

function getPrice(name) {
  const product = products.find((product) => product.name === name);
  if (product) {
    return product.price;
  }
}

newOrderBtn.addEventListener("click", () => {
  addAddOrder.classList.remove("hidden");
  editEditOrder.classList.add("hidden");
  orderContainer.classList.remove("hidden");
  editOrderId = false;
  idOrder.value = "";
  numberOrder.value = "";
  countOrder.value = "";
  NewOrderList.innerHTML = "";
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
    NewOrderList.childElementCount !== 0 &&
    idOrderInput &&
    numberOrderInput.length === 9 &&
    selectedOperatorId &&
    selectedFilialId
  ) {
    // const selectedProduct = products.find(
    //   (product) => product.id == selectedProductId
    // );
    const selectedOperator = operators.find(
      (operator) => operator.id == selectedOperatorId
    );
    const selectedFilial = fillials.find(
      (filial) => filial.id == selectedFilialId
    );

    const pTag = NewOrderList.querySelectorAll("p");
    let orderItem = [];

    pTag.forEach((p) => {
      let text = p.textContent || p.innerText;
      if (text.includes("Mahsulot:") && text.includes("Soni:")) {
        let productName = text.split("Mahsulot:")[1].split("Soni:")[0].trim();
        let productCount = text.split("Soni:")[1].trim();
        orderItem.push({
          name: productName,
          price: getPrice(productName),
          counter: productCount,
        });
      } else {
        alert("Buyurtma mavjud emas!!!");
      }
    });

    if (editOrderId !== false) {
      orders[editOrderId].name = idOrderInput;
      orders[editOrderId].number = numberOrderInput;
      orders[editOrderId].count = countOrderInput;
      orders[editOrderId].selectProductName = orderItem;
      orders[editOrderId].selectProductOperator = selectedOperator.id;
      orders[editOrderId].selectProductFilial = selectedFilial.id;
    } else {
      const newOrder = {
        id: getNextOrderId(),
        name: idOrderInput,
        number: numberOrderInput,
        selectProductName: orderItem,
        selectProductOperator: selectedOperator.id,
        selectProductFilial: selectedFilial.id,
        currentTime: getNowTime(),
      };
      orders.push(newOrder);
    }

    setOrders();
    orderContainer.classList.add("hidden");
    showOrders();
    idOrder.value = "";
    numberOrder.value = "";
    countOrder.value = "";
    editOrderId = false;
    NewOrderList.innerHTML = "";
    orderItem = [];
  } else {
    alert("Siz hali to'ldirmadingiz yoki to'ldirishda xatoga yo'l qo'ydiz!!!");
  }
});

function showOrders() {
  addOrderFunction.innerHTML = "";
  orders.forEach((order, i) => {
    addOrderFunction.innerHTML += `
      <div class="flex justify-center" id="order-${i}">
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
              order.selectProductName
            )}</h1>
            <h1><i class="fa-solid fa-sack-dollar"></i> ${ArrayIdCalcl(
              order.selectProductName,
              products
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
  countOrder.value = "";
  selectedProductId = document.getElementById("product_order").value = "Menu";

  selectedOperatorId = document.getElementById("operator_order").value =
    orderToEdit.selectProductOperator;
  selectedFilialId = document.getElementById("filial_order").value =
    orderToEdit.selectProductFilial;
  orderContainer.classList.remove("hidden");
  NewOrderList.classList.remove("hidden");
  NewOrderList.innerHTML = "";
  orderToEdit.selectProductName.forEach((element, index) => {
    NewOrderList.innerHTML += `
      <div class="flex items-end" data-index="${index}">
        <p class="text-white text-xl">Mahsulot: ${element.name} </br>Soni: ${element.counter}</p>
        <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteOrder1(${index})"/>
      </div>
    `;
  });
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

function ArrayId(array) {
  return array
    .map((element) => {
      const totalPrice = element.price * element.counter;
      return `<p>${element.name} ${element.counter}ta - ${element.price} = ${totalPrice}</p>`;
    })
    .join("");
}

function ArrayIdCalcl(order, objects) {
  let total = 0;
  order.forEach((element) => {
    const product = objects.find((obj) => obj.name === element.name);
    if (product) {
      total += product.price * element.counter;
    }
  });
  return total;
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

function NEWORDER(event) {
  event.preventDefault();
  const selectedProductId = document.getElementById("product_order").value;

  if (
    selectedProductId &&
    selectedProductId !== "Menu" &&
    countOrder.value.trim()
  ) {
    NewOrderList.classList.remove("hidden");
    NewOrderList.innerHTML += `
    <div class="flex items-end">
      <p class="text-white text-xl">Mahsulot: ${
        products[selectedProductId - 1].name
      } </br>Soni: ${countOrder.value}</p>
      <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteOrder1(${
        selectedProductId - 1
      })"/>
    </div>
      
      `;
    document.getElementById("product_order").value = "Menu";
    countOrder.value = "";
  } else {
    alert("Mahsulotni tanlang!");
  }
}

function deleteOrder1(index) {
  NewOrderList.removeChild(NewOrderList.children[index]);
}
