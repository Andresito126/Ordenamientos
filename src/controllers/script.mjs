import linkedList from "./dependencies.mjs";
import { grafica } from "../../grafica.mjs";
import { graficaAlgoritmos } from "../../grafica.mjs";
import { bubbleSort } from "../models/Array.mjs";
import { mergeSortArray } from "../models/Array.mjs";
import { radixSort } from "../models/Array.mjs";

//Declaración de variables para manipular eventos
let btnInsert = document.getElementById("btn-insertar");
let btnSearch = document.getElementById("btn-buscar");
let btnOrder = document.getElementById("btn-ordenar");
let array = [];

//Variables para medir el tiempo de un proceso
let timeInit = 0,
  timeEnd = 0,
  executionTime = 0;

const initializeVariables = () => {
  timeInit = 0;
  timeEnd = 0;
  executionTime = 0;
};

//Evento para insertar los correspondientes datos a la linkedList y al array
btnInsert.addEventListener("click", () => {
  let graphInsertDOM = document.getElementById("main_container-graph-insert");
  fetch("./bussines.json")
    .then((response) => response.json())
    .then((data) => {
      let processExecutionILk = insertLinkedList(data);
      let processExecutionIA = insertArray(data);
      grafica(processExecutionILk, processExecutionIA, graphInsertDOM);
    })
    .catch((err) => console.log(err));
});

const insertLinkedList = (data) => {
  timeInit = Date.now();

  for (let x = 0; x < 30000; x++) {
    linkedList.push(data[x]);
  }

  timeEnd = Date.now();
  executionTime = (timeEnd - timeInit) / 1000;

  console.log(
    "Tiempo de ejecución de inserción para la linked list: " + executionTime
  );
  console.log(linkedList);

  return executionTime;
};

const insertArray = (data) => {
  initializeVariables();
  timeInit = Date.now();

  for (let x = 0; x < 30000; x++) {
    array.push(data[x]);
  }

  timeEnd = Date.now();
  executionTime = (timeEnd - timeInit) / 1000;

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
    console.log(objetoBuscar);
    let graphSearchDOM = document.getElementById("main_container-graph-search");
    let processSearchLK = searchLinkedList(objetoBuscar);
    let processSearchA = searchArray(objetoBuscar);

    console.log(processSearchA, processSearchLK);
    if (!processSearchLK && !processSearchA) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontró dicho dato",
      });
    } else {
      grafica(processSearchLK, processSearchA, graphSearchDOM);
      document.getElementById("objBuscar").value = "";
    }
  }
});

const searchLinkedList = (objBuscar) => {
  initializeVariables();
  timeInit = Date.now();

  for (let x = 0; x < 30000; x++) {
    if (objBuscar == linkedList.getElementAt(x).data.business) {
      timeEnd = Date.now();
      executionTime = (timeEnd - timeInit) / 1000;
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

const searchArray = (objBuscar) => {
  initializeVariables();
  timeInit = Date.now();

  for (let x = 0; x < 30000; x++) {
    if (objBuscar == array[x].business) {
      timeEnd = Date.now();
      executionTime = (timeEnd - timeInit) / 1000;
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
    let graphOrderDOM = document.getElementById("main_container-graph-order");
    let arregloBubbleSort = [...array];
    let arregloMergeSort = [...array];
    let arregloRadixSort = [...array];
    let { executionTimeProcessB, arrB } = bubbleSort(arregloBubbleSort);
    let { executionTimeProcessM, arrM } = mergeSortArray(arregloMergeSort);
    let { executionTimeProcessR, arrR } = radixSort(arregloRadixSort);

    console.log(
      `Tiempo de ejecución de bubbleSort: ${executionTimeProcessB} segundos`
    );
    console.log(arrB);

    console.log(
      `Tiempo de ejecución de mergeSort: ${executionTimeProcessM} segundos`
    );
    console.log(arrM);

    console.log(
      `Tiempo de ejecución de radixSort: ${executionTimeProcessR} segundos`
    );
    console.log(arrR);

    let executionTimeLinkedListBubbleSort = linkedList.bubbleSort();
    console.log(
      `Tiempo de ejecución de bubbleSort en LinkedList: ${executionTimeLinkedListBubbleSort} segundos`
    );

    let resultMerge = linkedList.mergeSort();
    let { executionTimeLinkedListM, sortedList } = resultMerge;

    console.log('Tiempo de procesamiento:' + executionTimeLinkedListM + 's');

    let resultRadix = linkedList.radixSort();
    let {executionTimeLinkedListR, lkR} = resultRadix;
    
    console.log('Tiempo de ejecución de radix:' + executionTimeLinkedListR + 'segundos');

    graficaAlgoritmos(
      executionTimeProcessB,
      executionTimeProcessM,
      executionTimeProcessR,
      executionTimeLinkedListBubbleSort,
      executionTimeLinkedListM,
      executionTimeLinkedListR,
      graphOrderDOM
    );
  }
});
