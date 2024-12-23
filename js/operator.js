const newOperator = document.getElementById("new_operator");
const operator = document.getElementById("operator");
const nameInput = document.getElementById("name_operator");
const numberInput = document.getElementById("tel_operator");
const saveOperators = document.getElementById("save-operators");
let operators = JSON.parse(localStorage.getItem("operators")) || [];
let editOperatorId = null;

function setOperators() {
  localStorage.setItem("operators", JSON.stringify(operators));
}

newOperator.addEventListener("click", () => {
  operator.classList.remove("hidden");
  nameInput.value = "";
  numberInput.value = "";
  editOperatorId = null;
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

function editOperator(index) {
  operator.classList.remove("hidden");
  const operatorToEdit = operators[index];

  editOperatorId = index;

  nameInput.value = "";
  numberInput.value = "";
}

saveOperators.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputValue = nameInput.value;
  const numberInputValue = numberInput.value;

  if (nameInputValue.trim() && numberInputValue.trim()) {
    if (editOperatorId !== null) {
      operators[editOperatorId].name = nameInputValue;
      operators[editOperatorId].num = numberInputValue;
    } else {
      addOperatorToLocalStorage();
    }
    setOperators();
    operator.classList.add("hidden");
    showOperators();
    nameInput.value = "";
    numberInput.value = "";
    editOperatorId = null;
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function deleteOperator(index) {
  operators.splice(index, 1);
  setOperators();
  showOperators();
}
