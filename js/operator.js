const newOperator = document.getElementById("new_operator");
const operator = document.getElementById("operator");
const nameInputOperator = document.getElementById("name_operator");
const numberInputOperator = document.getElementById("tel_operator");
const saveOperators = document.getElementById("save-operators");
const addOperators = document.getElementById("add_operators");
const addAddOperator = document.getElementById("add-add-operator");
const editEditOperator = document.getElementById("edit-edit-operator");

let operators = JSON.parse(localStorage.getItem("operators")) || [];
let editOperatorId = false;
let extantOperator = true;
function setOperators() {
  localStorage.setItem("operators", JSON.stringify(operators));
}

newOperator.addEventListener("click", () => {
  addAddOperator.classList.remove("hidden");
  editEditOperator.classList.add("hidden");
  operator.classList.remove("hidden");
  nameInputOperator.value = "";
  numberInputOperator.value = "";
  editOperatorId = false;
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
    extant: extantOperator,
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
          </div>
        </div>
        <div class="border-2 p-4 w-full text-xl">
            <label class="switch">
           <input onclick="switchBtnO(${item.id - 1})" 
           type="checkbox" ${item.extant ? "checked" : ""}>
            <span class="slider round"></span>
            </label>
</div>
      </div>
    `;
    addOperators.appendChild(operatorDiv);
  });
}

function editOperator(index) {
  operator.classList.remove("hidden");
  const operatorToEdit = operators[index];
  editEditOperator.classList.remove("hidden");
  addAddOperator.classList.add("hidden");
  editOperatorId = index;
  nameInputOperator.value = operators[editOperatorId].name;
  numberInputOperator.value = operators[editOperatorId].num;
}

saveOperators.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputOperatorValue = nameInputOperator.value;
  const numberInputOperatorValue = numberInputOperator.value;

  if (nameInputOperatorValue.trim() && numberInputOperatorValue.length === 9) {
    if (editOperatorId !== false) {
      operators[editOperatorId].name = nameInputOperatorValue;
      operators[editOperatorId].num = numberInputOperatorValue;
      operators[editOperatorId].extant = extantOperator;
    } else {
      addOperatorToLocalStorage();
    }
    setOperators();
    operator.classList.add("hidden");
    showOperators();
    nameInputOperator.value = "";
    numberInputOperator.value = "";
    editOperatorId = false;
  } else {
    alert("Siz hali to'ldirmadingiz yoki raqam kiritishda xato!!!");
  }
});

function switchBtnO(i) {
  if (operators[i].extant === true) {
    operators[i].extant = false;
    setOperators();
  } else {
    operators[i].extant = true;
    setOperators();
  }
}
