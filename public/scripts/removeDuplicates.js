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


        // get the average of the prices (not including retail price)
        let avg = (stockx+goat+stadium+flight)/4

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


function adjustDate(mm, dd, yyyy){

    let today = mm + '/' + dd + '/' + yyyy;

    console.log(today)
    if (!uniqueDates.includes(today)){
        if (dd > 1){
            if (dd < 10){
                dd = '0' + (dd-1);
                adjustDate(mm, dd, yyyy)
            }
        }
        else{
            adjustDate(mm-1, 31, yyyy)
        }
    }




    return today;
}


function getTopBottomThree(today){
    let todaysSneakers = [];

    // get all the sneakers that were scraped last
    for (let i =0; i < uniqueData.length; i++){
        let sneakerDate = uniqueData[i].date; 
        // console.log(sneakerDate + " " + today)       
        if (sneakerDate === today){
            todaysSneakers.push(uniqueData[i]);
        }
    }

    console.log(today + "here");

    // used to find highest and lowest prices
    let maxPrice = todaysSneakers[0].average;
    let minPrice = todaysSneakers[0].average;

    for (let i = 0; i < todaysSneakers.length; i++){
        // get lowest and highest sneaker price 
        let sneakerPrice = todaysSneakers[i].average; // get sneaker price
        
        if (sneakerPrice > maxPrice){
            topThreeExpensive.push(todaysSneakers[i]);
        }
        else if (sneakerPrice < minPrice){
            topThreeCheapest.push(todaysSneakers[i]);
        }
    }


    return 0; 
}


function getDateHelper(){
    // get todays date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1); 
    let yyyy = today.getFullYear();


    let date = adjustDate(mm, dd, yyyy);

    return date;
}






getAllUniqueData();
let date = getDateHelper();
getTopBottomThree(date);
// console.log(uniqueData)
// getTopBottomThree();




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