

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
            // sneaker['stockXPrice'] = 0;
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

/**
 * This function takes checks the html adn gets the data that was produced by the api.
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


function assembleSite (){
    return 0;
}
let modelData = getmodelData()
getAveragePriceReSeller(modelData)

console.log(" ");
getApiData()
