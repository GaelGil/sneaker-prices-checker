let uniqueData = [];
let seenDataLists = [];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2020', '2021'];
let topThreeCheapest = [];
let topThreeExpensive = [];
let uniqueDates = []


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

    console.log(todaysSneakers.average);

    // used to find highest and lowest prices
    let maxPrice = todaysSneakers[0].average;
    let minPrice = todaysSneakers[0].average;

    let maxInDollars = todaysSneakers[0].average;
    for (let i =0; i < todaysSneakers.length; i++){
        let price = todaysSneakers[i].average;
        if (price > maxInDollars){
            maxInDollars = price;
        }
    }

    console.log(maxInDollars);

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


    return [maxPrice, minPrice]
}








getAllUniqueData();
let date = compareAndGetDate();
let maxAndMin = getTopBottomThree(date);


 

/**
 * This functions selects the top 3 most expensive and bottom 3 cheapest
 * sneakers from a list and loads them into html to display on the page.
 * @param none There are no parameters
 */
function loadSneakersToHtml(){



    window.onload = function(){
        // var name = prompt("What's your name?");
        // var lengthOfName = name.length
    
        // document.getElementById('output').innerHTML = lengthOfName;

        let maxShoe = maxAndMin[0].name;
        let minShoe = maxAndMin[1].name;


        document.getElementById('expensiveOneName').innerHTML = maxShoe;

        let imgId = document.getElementById('expensiveOneImg');
        let expensiveImg = new Image;
        expensiveImg.onload = function() {
            imgId.src = this.src;
        }
        expensiveImg.src = maxAndMin[0].img;

 

        document.getElementById('cheapOne').innerHTML = minShoe;

        let cheapImgId = document.getElementById('cheapOneImg');
        let cheapImg = new Image;
        cheapImg.onload = function() {
            cheapImgId.src = this.src;
        }
        cheapImg.src = maxAndMin[1].img;

 

    };


    return 0;
}


loadSneakersToHtml();