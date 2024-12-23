const newOperator = document.getElementById("new_operator");
const operator = document.getElementById("operator");
const nameInput = document.getElementById("name_operator");
const numberInput = document.getElementById("tel_operator");
const saveOperators = document.getElementById("save-operators");
const addOperators = document.getElementById("add_operators");
const editFormOperator = document.getElementById("edit-operator");
const editName = document.getElementById("edit-name");
const editTel = document.getElementById("edit-tel");
let operators = JSON.parse(localStorage.getItem("operators")) || [];
let editOperatorId;

function setOperators() {
  localStorage.setItem("operators", JSON.stringify(operators));
}

newOperator.addEventListener("click", () => {
  operator.classList.remove("hidden");
});

function getNextOperatorId() {
  return operators.length ? operators[operators.length - 1].id + 1 : 1;
}

function addOperatorToLocalStorage() {
  const nameInputValue = nameInput.value;
  const numberInputValue = numberInput.value;

  const newOperator = {
    id: getNextOperatorId(),
    name: nameInputValue,
    num: numberInputValue,
  };

  operators.push(newOperator);
  setOperators();
}

function showOperators() {
  addOperators.innerHTML = "";

  operators.forEach((item, i) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "justify-center");
    productDiv.innerHTML = `
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: ${item.id}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Operator Ismi: ${item.name}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Operator Raqami: ${item.num}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <div class="flex">
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editOperator(${i})"/>
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteOperator(${i})"/>
          </div>
        </div>
      </div>
    `;
    addOperators.appendChild(productDiv);
  });
}

function updateOperator() {
  const nameInputValue = editNameInput.value;
  const numberInputValue = editPriceInput.value;

  operators[editOperatorId].name = nameInputValue;
  operators[editOperatorId].num = numberInputValue;

  setOperators();
}

saveOperators.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputValue = nameInput.value;
  const numberInputValue = numberInput.value;
  if (nameInputValue.trim() && numberInputValue.trim()) {
    addOperatorToLocalStorage();
    operator.classList.add("hidden");
    showOperators();
    nameProductInput.value = "";
    priceProductInput.value = "";
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

editFormOperator.addEventListener("submit", (e) => {
  e.preventDefault();

  const productInput = editNameInput.value;
  const priceInput = editPriceInput.value;
  if (productInput.trim() && priceInput.trim()) {
    updateOperator();
    showOperators();
    closeModal();
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function deleteOperator(index) {
  operators.splice(index, 1);
  setOperators();
  showOperators();
}

function editOperator(index) {
  const operator = operators[index];
  openModal();
  editOperatorId = index;
  editName.value = "";
  editTel.value = "";
}
