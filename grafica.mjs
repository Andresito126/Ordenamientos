export const grafica = (timeL, timeA, domElement) => {
  const colors = ["#376cb8", "#cf7811"]; 

  const opciones = {
    chart: {
      height: 600,
      width: "80%",
      type: "bar",
      background: "#46b1cd",
      forecolor: "#333",
    },
    series: [{
      name: 'Insercción',
      data: [timeL, timeA]
    }],
    colors: colors, // Colores para las barras
    plotOptions: {
      bar: {
        columnWidth: '55%',
        distributed: true // Distribuye los colores a cada barra
      }
    },
    title: {
      text: 'Comparación de tiempos de inserción',
      align: 'center', 
      style: {
        fontSize: '20px',
        color: '#fff'
      }
    },
    xaxis: {
      categories: [
        'Lista enlazada',
        'Array'
      ],
      labels: {
        style: {
          colors: colors, 
          fontSize: '16px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Tiempo'
      }
    }
  };

  const chart = new ApexCharts(domElement, opciones);
  chart.render();
};

export const graficaAlgoritmos = (
  executionTimeProcessB,
  executionTimeProcessM,
  executionTimeProcessR,
  executionTimeLinkedListBubbleSort,
  executionTimeLinkedListM,
  executionTimeLinkedListR,
  graphOrderDOM
) => {
  const opciones = {
    chart: {
      height: 650,
      width: "100%",
      type: "bar",
      background: "#46b1cd",
      foreColor: "#333",
    },
    series: [
      {
        name: "Array",
        data: [
          executionTimeProcessB,
          executionTimeProcessM,
          executionTimeProcessR,
        ],
      },
      {
        name: "LinkedList",
        data: [executionTimeLinkedListBubbleSort,executionTimeLinkedListM,executionTimeLinkedListR],
      },
    ],
    xaxis: {
      categories: ["Bubble Sort", "Merge Sort", "Radix Sort"],
      title: {
        text: "Algoritmos",
      },
    },
    yaxis: {
      title: {
        text: "Tiempo (segundos)",
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value.toFixed(2)} segundos`;
        },
      },
    },
    theme: {
      mode: "light",
    },
    colors: ["#376cb8", "#cf7811", "#008FFB", "#FF9800", "#3F51B5", "#9C27B0"],
  };

  const chart = new ApexCharts(graphOrderDOM, opciones);
  chart.render();
};
