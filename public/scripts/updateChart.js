
/**
 * This functions draws a bar chart onto html by selecting a id and with the
 * data collected in the function `getLabelsAndData`.
 * @param none There are no parameters
 */
function drawChart(labels, data, chartLabel, barClass) {
  const chartClass = document.getElementById(barClass);
  chartClass.height = 400;
  chartClass.width = 350;

  const myChart = new Chart(chartClass, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: chartLabel,
        data: data,
        backgroundColor: [
          'rgba(255, 192, 203, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 192, 203, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: false,
      // maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });

  return myChart;
}


/**
* This function takes checks the html and gets the data that was produced by the api.
* @param none There are no parameters
* @return list
*/
function getData() {
  let data = document.querySelectorAll('.apiData');
  const usefulData = [];
  data = data[0].textContent;
  data = JSON.parse(data);
  // add prices and sizes and where to buy
  usefulData.push(data.resellPrices, data.resellLinks);

  return usefulData;
}


/**
* This function takes in some integer (size) and some data. The data is a list where the
* first element is a dictionary. The keys are websites and and the values are dictionaries
* containing the prices for each size. The function looks for the choosen size and returns
* a list of prices.
* @param int a sneaker size
* @param list a list containing sneaker size prices
* @return list
*/
function getPricesForSize(choosenSize, data) {
  // select the ressell prices dictionary
  const sizeData = data[0];
  const sizePrices = [];

  // find all the prices in each site and add to list
  for (const site in sizeData) {
    // check if the property/key is defined in the object itself, not in parent
    if (choosenSize in sizeData[site]) {
      // add name of site and price with the choosen size
      sizePrices.push([site, sizeData[site][choosenSize]]);
    }
  }
  if (sizePrices === undefined || sizePrices.length ===0) {
    alert(`could not find size ${choosenSize}`);
    return 0;
  }

  return sizePrices;
}


function updateChart(defaultChart) {
  const size = document.getElementById('size').value;
  const sizeData = getData();
  const customChart = defualtChart;
  data = getPricesForSize(size, sizeData);
  if (data === 0) {
    return 0;
  }
  // remove old graph
  customChart.data['labels'] = null;
  customChart.data['datasets'][0]['data'] = null;
  customChart.data['datasets'][0]['label'] = null;
  customChart.update();
  // get labels and data
  const sizeSite = data.map(function(value, index) {
    return value[0];
  });
  const dataset = data.map(function(value, index) {
    return value[1];
  });
  const label = `size ${size} prices`;
  // add user input
  customChart.data['labels'] = sizeSite;
  customChart.data['datasets'][0]['data'] = dataset;
  customChart.data['datasets'][0]['label'] = label;
  customChart.update();

  return 0;
}


function addWhereToBuy(data) {
  const whereToBuy = `
    <table class="table">
        <thead>
            <tr>
            <th scope="col">Where to Buy</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td><a target="_blank" rel="noopener noreferrer" href="${data[1].stockX}">stockX</a></td>
            </tr>
            <tr>
            <td><a target="_blank" rel="noopener noreferrer" href="${data[1].goat}">goat</a></td>
            </tr>
            <tr>
            <td><a target="_blank" rel="noopener noreferrer" href="${data[1].fligtClub}">fligthclub</a></td>
            </tr>
            <tr>
            <td><a target="_blank" rel="noopener noreferrer" href="${data[1].stadiumGoods}">stadiumgoods</a></td>
            </tr>
        </tbody>
    </table>`;

  $('.resellSites').append(whereToBuy);
  return 0;
}


function setDefaultChart() {
  // get api data
  const data = getData();
  // get size data
  const sizes = getPricesForSize(10, data);
  // name of sites for labels
  const sizeSite = sizes.map(function(value, index) {
    return value[0];
  });
  // price of size
  const sizePrices = sizes.map(function(value, index) {
    return value[1];
  });
  // draw a chart
  const defualtChart = drawChart(sizeSite, sizePrices, 'size 10 prices', 'sizePrices');
  addWhereToBuy(data);

  return defualtChart;
}


function toHtml() {
  let html = document.querySelectorAll('.htmlString');
  // get the data that is in the paragraph
  html = html[0].textContent;
  $('.form').append(html);

  return 0;
}


toHtml();
const defualtChart = setDefaultChart();