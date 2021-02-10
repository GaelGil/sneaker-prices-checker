let uniqueData = [];
let seenDataLists = [];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2020', '2021'];
let topThreeCheapest = [];
let topThreeExpensive = [];
let uniqueDates = []


function getAllUniqueData(){
    let num = 0;
    let dataParagraphs = document.querySelectorAll(".data");
    for (let i =0; i < dataParagraphs.length; i++){

        // select the data point (the sentence)
        let data = dataParagraphs[i].textContent;

        // turn sentence into a list of words
        let dataList = data.split(" ");

        // console.log(dataList);
        // set prices, colorway, brand and name
        let colorway = dataList[0];
        let name = "";
        // let brand = "";
        let retail = parseInt(dataList[1]);
        let stockx = parseInt(dataList[2]);
        let goat = parseInt(dataList[3]);
        let stadium = parseInt(dataList[4]);
        let flight = parseInt(dataList[5]);




        // get the date 
        let year = 0;
        let month = 0;
        let day = dataList[8];

        // get month and year for the date
        for (let j = 0; j < MONTHS.length; j++){
            if (dataList[7] === MONTHS[j]){
                month = j+1;
                if (dataList[9] === YEARS[0]){
                    year = YEARS[0];
                }else{
                    year = YEARS[1];
                }
            }
        }

        let date = month + "/" + day + "/" + year
        

        if (seenDataLists.includes(data)){
            num +=1;
        }else{
        if (isNaN(stockx)){
            stockx = 0;
        }
        else if (isNaN(goat)){
            goat = 0;
        }
        else if (isNaN(flight)){
            flight = 0;
        }
        else if (isNaN(stadium)){
            stadium = 0;
        }

        // get the average of the prices (not including retail price)
        let avg = (stockx+goat+stadium+flight)/4

        // add a never seen date
        seenDataLists.push(data);
        uniqueDates.push(date);
        // append dictionary to unique data
        uniqueData.push({
            "releaseDate": dataList[0],
            "retail": retail,
            "stockx": stockx,
            "goat": goat,
            "stadium": stadium,
            "flight": flight,
            "date": date,
            "average": avg,
            "colorway": colorway,
            "name": name,
        })
        }


    }
    return 0;
}


function compareAndGetDate(){

    uniqueDates.sort(function(a,b) { 
        return new Date(a.start).getTime() - new Date(b.start).getTime() 
    });


    let date = uniqueDates[uniqueDates.length-1];

    return date;
}


function getTopBottomThree(today){
    let todaysSneakers = [];

    // get all the sneakers that were scraped last
    for (let i =0; i < uniqueData.length; i++){
        let sneakerDate = uniqueData[i].date; 
        if (sneakerDate === today){
            todaysSneakers.push(uniqueData[i]);
        }
    }


    // used to find highest and lowest prices
    let maxPrice = todaysSneakers[0].average;
    let minPrice = todaysSneakers[0].average;

    // console.log(todaysSneakers[0])

    for (let i = 0; i < todaysSneakers.length; i++){
        // get lowest and highest sneaker price 
        let sneakerPrice = todaysSneakers[i].average; // get sneaker price
        // console.log(sneakerPrice + " " + maxPrice)
        if (sneakerPrice > maxPrice){
            maxPrice = todaysSneakers[i]
        }

        if (sneakerPrice < minPrice){
            minPrice = todaysSneakers[i]
        }
    }

    console.log(maxPrice);
    console.log(minPrice);
    return 0; 
}








getAllUniqueData();
let date = compareAndGetDate();
getTopBottomThree(date);

/**
 * This functions selects the top 3 most expensive and bottom 3 cheapest
 * sneakers from a list and loads them into html to display on the page.
 * @param none There are no parameters
 */
function loadSneakersToHtml(){



    window.onload = function(){
        var name = prompt("What's your name?");
        var lengthOfName = name.length
    
        document.getElementById('output').innerHTML = lengthOfName;
    };
    return 0;
}