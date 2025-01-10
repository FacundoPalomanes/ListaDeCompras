class objeto {
  constructor(id, nombre, cantidad) {
    this.id = id;
    this.name = nombre;
    this.cantidad = cantidad;
  }
}

const saveLocalList = () => {
  localStorage.setItem("list", JSON.stringify(lista));
}
const restoreLocalList = () => {
  return JSON.parse(localStorage.getItem("list"));
}

let lista = restoreLocalList() || [];
conditionalRender();

let agregar = document.getElementById("add");
let restablecer = document.getElementById("restablecer");
let addInput = document.getElementById("text_input");
let valueInput = document.getElementById("value_input");

addInput.addEventListener("keydown", function(event) {
  if(event.key == 'Enter') {
    event.preventDefault();
    add();
  }
})
valueInput.addEventListener("keydown", function(event) {
  if(event.key == 'Enter') {
    event.preventDefault();
    add();
  }
})
agregar.addEventListener("click", add);
restablecer.addEventListener("click", restore);

function conditionalRender() {
  let list = document.getElementById("list");
  if (lista.length == 0) {
    list.innerHTML =
      "<div class='empty_list'><h1>🛒🧺</h1> <h2>La lista esta vacia</h2></div>";
  } else {
    list.innerHTML = `${lista.map((i, z) => {
      return `<div class="things_list"><h3>${i.name}</h3> <h3 class="item">x${i.cantidad}</h3><button id="erase" onclick="deleteItem(${z})" class="erase_button">❌</button></div>`;
    })}`;
  }
}

// Función para eliminar un elemento específico
function deleteItem(index) {
  lista.splice(index, 1); // Elimina el elemento en el índice especificado
  saveLocalList();
  conditionalRender(); // Vuelve a renderizar la lista
}

function add() {
  let textInput = document.getElementById("text_input");
  let valueInput = document.getElementById("value_input");
  if (textInput.value != "") {
    let number = isNaN(parseInt(valueInput.value))
      ? 1
      : parseInt(valueInput.value);

    let nuevo = new objeto(lista.length, textInput.value, number);
    textInput.value = "";
    valueInput.value = 1;
    lista.push(nuevo);
    saveLocalList();
    console.log(lista);
    conditionalRender();
  }
}

function restore() {
  document.getElementById("list").innerHTML = "";
  lista = [];
  saveLocalList();
  conditionalRender();
}
