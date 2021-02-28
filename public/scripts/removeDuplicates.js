let uniqueData = []; 
let uniqueDates = []
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2020', '2021']; 
const BRANDS = ['Nike', 'Jordan', 'Yeezy', 'adidas', ''];
let topThreeCheapest = [];
let topThreeExpensive = [];

/**
 * This functions goes through all the data that has been collected. It selects it
 * by accessing text from paragraphs loaded as hidden in html. We select each paragraph
 * (sneaker data) which we then turn its contents to a list of strings. The contents are
 * price, name, release date, date the data was gotten etc. Because some of my data has 
 * duplicates I created a list to track what we have seen before. We check if we have seen
 * a certain sneaker by checking its name and date the data was obtained. Once it has 
 * cleared we add it to a list `uniqueData` as a dictionary. 
 * @param none There are no parameters
 */
function getAllUniqueData(){
    let num = 0;
    let seenDataLists = [];
    // select all the hidden paragraphs
    let dataParagraphs = document.querySelectorAll(".data");
    for (let i =0; i < dataParagraphs.length; i++){

        // select the data point (the sentence)
        let data = dataParagraphs[i].textContent;

        // turn the data sentence into a list of strings
        let dataList = data.split(" ");

        // set prices, colorway, brand and name
        let colorway = dataList[0];
        let retail = parseInt(dataList[1]);
        let stockx = parseInt(dataList[2]);
        let goat = parseInt(dataList[3]);
        let stadium = parseInt(dataList[4]);
        let flight = parseInt(dataList[5]);
        let img = dataList[15];
        let name = dataList.slice(16,dataList.length-1);
        name = name.join(" ");

        // get the date 
        let year = 0;
        let month = 0;
        let day = dataList[8];

        // get month and year for the date in (mm/dd/yyyy) formant
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
            'img': img,
        })
        }


    }
    return 0;
}



/**
 * This function sorts the list of unique dates and returns the most recent. This will
 * help us select the data for the last time we have the scraped data. Once we have 
 * that date we can return for use later.
 * @param none There are no parameters
 */
function getDate(){

    uniqueDates.sort(function(a,b) { 
        return new Date(a.start).getTime() - new Date(b.start).getTime() 
    });

    let date = uniqueDates[uniqueDates.length-1];

    return date;
}



/**
 * This function creates a list of sneakers with the same date as the parameter date. From 
 * that list we can now get the most expensive and cheapest sneakers from that date. We do
 * by going using a simple algorithm to find the max and the min while also appending what
 * we see to a list of expensive or cheap sneakers. In the end this will leave us with a 
 * list where the most expensive and cheapest are at the end of the list.
 * @param {string} today This function takes in a string (date mm/dd/yyyy) as its paramter 
 * @return {list} This list contains 2 lists inside of them where each list has 3 sneakers in it
 */
function getTopBottomThree(today){
    let thisWeeksSneakers = []
    let listOfExpensive = []
    let listOfCheapest = []

    // get all the sneakers that were scraped last
    for (let i =0; i < uniqueData.length; i++){
        let sneakerDate = uniqueData[i].date; 
        if (sneakerDate === today){
            thisWeeksSneakers.push(uniqueData[i]);
        }
    }

    // used to find highest and lowest prices
    let maxPrice = thisWeeksSneakers[0].average;
    let minPrice = thisWeeksSneakers[0].average;

    // get lowest and highest sneaker price 
    for (let i = 0; i < thisWeeksSneakers.length; i++){
        let sneakerPrice = thisWeeksSneakers[i].average; // get sneaker price
        let sneaker = thisWeeksSneakers[i]; // get sneaker data 

        if (sneakerPrice > maxPrice){
            maxPrice = sneakerPrice;
            listOfExpensive.push(sneaker)
        }

        if (sneakerPrice < minPrice){
            minPrice = sneakerPrice;
            listOfCheapest.push(sneaker);
        }
    }

    listOfExpensive = listOfExpensive.slice(listOfExpensive.length-3, listOfExpensive.length)

    listOfCheapest = listOfCheapest.slice(listOfCheapest.length-3, listOfCheapest.length)

    return [listOfExpensive, listOfCheapest]
}


/**
 * This functions selects the top 3 most expensive and bottom 3 cheapest
 * sneakers from a list and loads them into html to display on the page.
 * @param expensiveAndCheap list that contains two lists inside with most
 *        expensive and cheapest sneakers
 */
function loadSneakersToHtml(maxAndMin){



    window.onload = function(){
        let expensiveList = maxAndMin[0];
        let cheapList = maxAndMin[1];

        console.log(expensiveList);
        
        // append expensive sneakers to html
        document.getElementById('expensiveOneName').innerHTML = expensiveList[0].name;
        document.getElementById('expensiveTwoName').innerHTML = expensiveList[1].name;
        document.getElementById('expensiveThreeName').innerHTML = expensiveList[2].name;

        $(`<img class="img-fluid mb-3" src="${expensiveList[0].img}">`).prependTo("#expensiveSneakerOne");
        $(`<img class="img-fluid mb-3" src="${expensiveList[1].img}">`).prependTo("#expensiveSneakerTwo");
        $(`<img class="img-fluid mb-3" src="${expensiveList[2].img}">`).prependTo("#expensiveSneakerThree");

        $(`<p class="font-weight-light mb-0">Average Price: $${expensiveList[0].average} </p>`).appendTo("#expensiveSneakerOne");
        $(`<p class="font-weight-light mb-0">Average Price: $${expensiveList[1].average} </p>`).appendTo("#expensiveSneakerTwo");
        $(`<p class="font-weight-light mb-0">Average Price: $${expensiveList[2].average} </p>`).appendTo("#expensiveSneakerThree");
        


        // append cheap sneakers to html
        document.getElementById('cheapOneName').innerHTML = cheapList[0].name;
        document.getElementById('cheapTwoName').innerHTML = cheapList[1].name;
        document.getElementById('cheapThreeName').innerHTML = cheapList[2].name;

        $(`<img class="img-fluid mb-3" src="${cheapList[0].img}">`).prependTo("#cheapSneakerOne");
        $(`<img class="img-fluid mb-3" src="${cheapList[1].img}">`).prependTo("#cheapSneakerTwo");
        $(`<img class="img-fluid mb-3" src="${cheapList[2].img}">`).prependTo("#cheapSneakerThree");

        $(`<p class="font-weight-light mb-0">Average Price: $${cheapList[0].average} </p>`).appendTo("#cheapSneakerOne");
        $(`<p class="font-weight-light mb-0">Average Price: $${cheapList[1].average} </p>`).appendTo("#cheapSneakerTwo");
        $(`<p class="font-weight-light mb-0">Average Price: $${cheapList[2].average} </p>`).appendTo("#cheapSneakerThree");


    };


    return 0;
}



/**
 * This functions will go through all the data and try and add a brand to a 
 * sneaker by searching through each sneakers name.
 * @param data A list of all the unique sneaker data
 */
function getBrand(data){
    return 0;
}



function assembleSite(){
    getAllUniqueData();
    let date = getDate();
    let expensiveAndCheap = getTopBottomThree(date);
    loadSneakersToHtml(expensiveAndCheap);
}



 

assembleSite();

