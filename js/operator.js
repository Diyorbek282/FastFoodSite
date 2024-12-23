const newOperator = document.getElementById("new_operator");
const operator = document.getElementById("operator");
const nameInputOperator = document.getElementById("name_operator");
const numberInputOperator = document.getElementById("tel_operator");
const saveOperators = document.getElementById("save-operators");
const addOperators = document.getElementById("add_operators");

let operators = JSON.parse(localStorage.getItem("operators")) || [];
let editOperatorId = null;

function setOperators() {
  localStorage.setItem("operators", JSON.stringify(operators));
}

newOperator.addEventListener("click", () => {
  operator.classList.remove("hidden");
  nameInputOperator.value = "";
  numberInputOperator.value = "";
  editOperatorId = null;
});

function getNextOperatorId() {
  return operators.length ? operators[operators.length - 1].id + 1 : 1;
}

function addOperatorToLocalStorage() {
  const nameInputOperatorValue = nameInputOperator.value;
  const numberInputOperatorValue = numberInputOperator.value;

  const newOperator = {
    id: getNextOperatorId(),
    name: nameInputOperatorValue,
    num: numberInputOperatorValue,
  };

  operators.push(newOperator);
  setOperators();
}

function showOperators() {
  addOperators.innerHTML = "";

  operators.forEach((item, i) => {
    const operatorDiv = document.createElement("div");
    operatorDiv.classList.add("flex", "justify-center");
    operatorDiv.innerHTML = `
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: ${item.id}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Ismi: ${item.name}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Raqami: ${item.num}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <div class="flex">
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editOperator(${i})"/>
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteOperator(${i})"/>
          </div>
        </div>
      </div>
    `;
    addOperators.appendChild(operatorDiv);
  });
}

function editOperator(index) {
  operator.classList.remove("hidden");
  const operatorToEdit = operators[index];

  editOperatorId = index;

  nameInputOperator.value = "";
  numberInputOperator.value = "";
}

saveOperators.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputOperatorValue = nameInputOperator.value;
  const numberInputOperatorValue = numberInputOperator.value;

  if (nameInputOperatorValue.trim() && numberInputOperatorValue.trim()) {
    if (editOperatorId !== null) {
      operators[editOperatorId].name = nameInputOperatorValue;
      operators[editOperatorId].num = numberInputOperatorValue;
    } else {
      addOperatorToLocalStorage();
    }
    setOperators();
    operator.classList.add("hidden");
    showOperators();
    nameInputOperator.value = "";
    numberInputOperator.value = "";
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
