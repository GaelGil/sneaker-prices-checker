

/**
 * This function takes checks the html adn gets the data that was produced by the sneaker model.
 * The model is passed into the html as json. Here I grab the `p` tag and select the text and 
 * then turn that string into json with `JSON.parse` which will give us each sneaker record. We
 * can now select each sneaker so I will add some things that will be useful later. I change the
 * date into `mm/dd/yyyy` format and I calculate the average. Laslty itll return a list where 
 * each sneaker record is item in the list as a dictionary
 * @param none There are no parameters
 * @return list 
 */
function getmodelData(){
    let data = document.querySelectorAll(".modelData");
    // get the data that is in the paragraph
    data = data[0].textContent;
    // turn that the data string into json format
    data = JSON.parse(data)

    // for every sneaker record
    for (let i = 0; i < data.length; i++){
        sneaker = data[i];

        // get the date from `2020-12-23T22:11:35.463Z` to `12/23/2020`
        let date = new Date(sneaker.createdAt);
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

        // get averages if one price nan or null we set it to 0
        let stockx = sneaker.stockXPrice;
        let goat =  sneaker.goatPrice;
        let flight =  sneaker.flightClubPrice;
        let stadium =  sneaker.stadiumGoodsPrice;
        let avg = 0

        if (isNaN(stockx)){
            stockx = 0;
            sneaker['stockXPrice'] = 0;
        }
        
        if (isNaN(goat)){
            goat = 0;
            sneaker['goatPrice'] = 0;
        }
        
        if (isNaN(flight)){
            flight = 0;
            sneaker['flightClubPrice'] = 0;
        }

        if (isNaN(stadium)){
            stadium = 0;
            sneaker['stadiumGoodsPrice'] = 0;
        }

        avg = (stockx+goat+stadium+flight)/4

        // add avergae and date to sneaker data
        sneaker['avg'] = avg;
        sneaker['date'] = date;
    }

    return data
}


/**
 * This function takes checks the html and gets the data that was produced by the api.
 * @param none There are no parameters
 * @return list
 */
 function getApiData(){
    let data = document.querySelectorAll(".apiData");
    let usefulData = []
    data = data[0].textContent;
    data = JSON.parse(data)
    // add prices and sizes and where to buy
    usefulData.push(data.resellPrices, data.resellLinks)

    return usefulData;
}


/**
 * This functions goes through all the data that has been collected. It selects it
 * @param none There are no parameters
 */
 function getAveragePriceReSeller(data){
     let averageDataByReseller = []
     let totalStockxPrice = 0;
     let totalGoatPrice = 0;
     let totalStadiumPrice = 0;
     let totalFlightPrice = 0;
     let totalAveragePrice = 0;
    //  add up all the data
     for (let i = 0; i < data.length;i++){        
        totalStockxPrice = data[i].stockXPrice;
        totalGoatPrice = data[i].goatPrice;
        totalStadiumPrice = data[i].stadiumGoodsPrice;
        totalFlightPrice = data[i].flightClubPrice;
        totalAveragePrice = data[i].avg;
    }

    averageDataByReseller.push(
        {
        "place": "retail",
        "price": data[0].retailPrice,
        },
        {
        "place": "stockx",
        "price": totalStockxPrice
        },
        {
        "place": "goat",
        "price": totalGoatPrice
        },
        {
        "place": "stadium",
        "price": totalStadiumPrice
        },
        {
        "place": "flight",
        "price": totalFlightPrice
        },
        {
        "place": "average",
        "price": totalAveragePrice
        })

        return averageDataByReseller;

}


function getLabelsAndData(averagePrices, allData){
    // get barchartData
    let barChart = []
    let barChartLabels = []
    let barChartData = []

    for (let i = 0; i < averagePrices.length; i++){
        let price = averagePrices[i].price;
        let site = averagePrices[i].place;
        barChartLabels.push(site);
        barChartData.push(price)
      
    }

    barChart.push(barChartLabels, barChartData)

    


    return 0
}


function getPricesForSize(choosenSize, data){
    // select the ressell prices dictionary
    let sizeData = data[0];
    let sizePrices = []

    // find all the prices in each site and add to list
    for (let site in sizeData) {
        // check if the property/key is defined in the object itself, not in parent
        if (choosenSize in sizeData[site]){
        // add name of site and price with the choosen size
        sizePrices.push([site, sizeData[site][choosenSize]])
        }
    }

    return sizePrices;
}

/**
 * This functions draws a bar chart onto html by selecting a id and with the data
 * collected in the function `getLabelsAndData`.
 * @param none There are no parameters
 */
 function drawBarChart(labels, data, chartLabel){
    var ctx = document.getElementById('barChart');
    ctx.height = 400;
    ctx.width = 400;
    
    var myChart = new Chart(ctx, {
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
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 192, 203, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            // maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return 0;
}

let modelData = getmodelData();
let apiData = getApiData();
let sitePrices = getAveragePriceReSeller(modelData);

// getLabelsAndData(sitePrices, modelData)
getPricesForSize(10, apiData)

drawBarChart()



