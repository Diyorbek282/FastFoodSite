const newFillial = document.getElementById("new_fillial");
const fillial = document.getElementById("fillial");
const nameInputFillial = document.getElementById("name_fillial");
const numberInputFillial = document.getElementById("num_fillial");
const saveFillials = document.getElementById("save-fillials");
const addFillials = document.getElementById("add_fillials");

let fillials = JSON.parse(localStorage.getItem("fillials")) || [];
let editFillialId = false;

function setFillials() {
  localStorage.setItem("fillials", JSON.stringify(fillials));
}

newFillial.addEventListener("click", () => {
  fillial.classList.remove("hidden");
  nameInputFillial.value = "";
  numberInputFillial.value = "";
  editFillialId = false;
});

function getNextFillialId() {
  return fillials.length ? fillials[fillials.length - 1].id + 1 : 1;
}

function addFillialToLocalStorage() {
  const nameInputFillialValue = nameInputFillial.value;
  const numberInputFillialValue = numberInputFillial.value;

  const newFillial = {
    id: getNextFillialId(),
    name: nameInputFillialValue,
    location: numberInputFillialValue,
  };

  fillials.push(newFillial);
  setFillials();
}

function showFillials() {
  addFillials.innerHTML = "";

  fillials.forEach((item, i) => {
    const fillialDiv = document.createElement("div");
    fillialDiv.classList.add("flex", "justify-center");
    fillialDiv.innerHTML = `
      <div class="flex w-5/6">
        <div class="border-2 p-4 w-full text-xl">
          <h1>ID: ${item.id}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Nomi: ${item.name}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <h1>Location: ${item.location}</h1>
        </div>
        <div class="border-2 p-4 w-full text-xl">
          <div class="flex">
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./edit.svg" width="25" height="25" onclick="editFillial(${i})"/>
            <img class="cursor-pointer transition-all duration-500 hover:scale-110" src="./delete.svg" width="25" height="25" onclick="deleteFillial(${i})"/>
          </div>
        </div>
      </div>
    `;
    addFillials.appendChild(fillialDiv);
  });
}

function editFillial(index) {
  fillial.classList.remove("hidden");
  const fillialToEdit = fillials[index];

  editFillialId = index;

  nameInputFillial.value = "";
  numberInputFillial.value = "";
}

saveFillials.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInputFillialValue = nameInputFillial.value;
  const numberInputFillialValue = numberInputFillial.value;

  if (nameInputFillialValue.trim() && numberInputFillialValue.trim()) {
    if (editFillialId !== false) {
      fillials[editFillialId].name = nameInputFillialValue;
      fillials[editFillialId].location = numberInputFillialValue;
    } else {
      addFillialToLocalStorage();
    }
    setFillials();
    fillial.classList.add("hidden");
    showFillials();
    nameInputFillial.value = "";
    numberInputFillial.value = "";
    editFillialId = false;
  } else {
    alert("Siz hali to'ldirmadingiz");
  }
});

function deleteFillial(index) {
  fillials.splice(index, 1);
  setFillials();
  showFillials();
}
