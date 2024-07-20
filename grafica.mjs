export default function grafica(timeL, timeA, domElement) {
  const opciones = {
    chart: {
      height: 200,
      width: "40%",
      type: "bar",
      background: "#f4f4f4",
      forecolor: "#333",
    },
    series: [{
      name: 'Insercción',
      data: [timeL, timeA]
    }],
    xaxis: {
      categories: [
        'Lista enlazada',
        'Array'
      ]
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
