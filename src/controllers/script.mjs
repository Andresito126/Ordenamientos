import linkedList from "./dependencies.mjs";
import grafica from "../../grafica.mjs";
import { bubbleSort } from "../models/Array.mjs";

//Declaración de variables para manipular eventos
let btnInsert = document.getElementById("btn-insertar");
let btnSearch = document.getElementById("btn-buscar");
let btnOrder = document.getElementById("btn-ordenar");
let array = [];

//Variables para medir el tiempo de un proceso
let timeInit = 0,timeEnd = 0,executionTime = 0;

const initializeVariables = () => {
  timeInit = 0;
  timeEnd = 0;
  executionTime = 0;
}


//Evento para insertar los correspondientes datos a la linkedList y al array
btnInsert.addEventListener("click", () => {
  let graphInsertDOM = document.getElementById('container-graph-insert');
  fetch("./bussines.json")
    .then((response) => response.json())
    .then((data) => {
      let processExecutionILk = insertLinkedList(data);
      let processExecutionIA = insertArray(data);
      grafica(processExecutionILk,processExecutionIA,graphInsertDOM)
      
    })
    .catch((err) => console.log(err));
});

const insertLinkedList = (data) => {
  timeInit = Date.now();

  for (let x = 0; x < 5; x++) {
    linkedList.push(data[x]);
  }

  timeEnd = Date.now();
  executionTime = ((timeEnd - timeInit) / 1000);

  console.log(
    "Tiempo de ejecución de inserción para la linked list: " + executionTime
  );
  console.log(linkedList);

  return executionTime;
};

const insertArray = (data) => {
  //LLamando a la función para que inicialice a las variables de timeInit y timeEnd.
  initializeVariables();
  timeInit = Date.now();

  for (let x = 0; x < 5; x++) {
    array.push(data[x]);
  }

  timeEnd = Date.now();
  executionTime = ((timeEnd - timeInit) / 1000);

  console.log(
    "Tiempo de ejecución de inserción para el array: " + executionTime
  );
  console.log(array);

  return executionTime;
};

//Evento para poder buscar un determinado objeto
btnSearch.addEventListener("click", () => {
  if (linkedList.isEmpty() && array.length == 0) {
    Swal.fire({
      title: "Primero tienes que insertar datos",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  } else {
    let objetoBuscar = document.getElementById("objBuscar").value;
    let graphSearchDOM = document.getElementById('container-graph-search');
    console.log(objetoBuscar);
    let processSearchLK = buscarListaEnlazada(objetoBuscar);
    let processSearchA = buscarArray(objetoBuscar);

    console.log(processSearchLK,processSearchA)

    if(!processSearchLK && !processSearchA){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontró dicho dato",
      })
    }else{
      grafica(processSearchLK,processSearchA,graphSearchDOM);
      document.getElementById("objBuscar").value = "";
    }
  }
});

const buscarListaEnlazada = (objBuscar) => {
  //LLamando a la función para que inicialice a las variables de timeInit y timeEnd.
  initializeVariables();
  console.log("Objeto entrando linked " + objBuscar);
  
  timeInit = Date.now();

  for (let x = 0; x < 150346; x++) {
    if (objBuscar == linkedList.getElementAt(x).data.business) {
      timeEnd = Date.now();
      executionTime = ((timeEnd - timeInit) / 1000);
      console.log(
        "Tiempo de ejecución para buscar en lk a " +
          objBuscar +
          "fue: " +
          executionTime
      );
      return executionTime;
    }
  }
  return false;
};



const buscarArray = (objBuscar) => {
  //LLamando a la función para que inicialice a las variables de timeInit y timeEnd.
  initializeVariables();

  console.log("Objeto entrando array " + objBuscar);

  timeInit = Date.now();
  for (let x = 0; x < 150346; x++) {
    if (objBuscar == array[x].business) {
      timeEnd = Date.now();
      executionTime = ((timeEnd - timeInit) / 1000);
      console.log(
        "Tiempo de ejecución para buscar en array a " +
          objBuscar +
          "fue: " +
          executionTime
      );
      return executionTime;
    }
  }
  return false;
};

//Evento para ordenar por los diferentes algoritmos
btnOrder.addEventListener("click", () => {
  if (linkedList.isEmpty() && array.length == 0) {
    Swal.fire({
      title: "Primero tienes que insertar datos",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  } else {
    let graphOrderDOM = document.getElementById('container-graph-order');
    let {executionTime, arr} = bubbleSort(array);
    console.log(executionTime)
    console.log(arr)
    //ordenarMergeSort();
    //ordenarRadixSort();
  }
});



