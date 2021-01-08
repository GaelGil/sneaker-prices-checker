
let allData = [];

function getAllData(){
    // select each data section
    let dataParagraphs = document.querySelectorAll(".data");
    for (let i =0; i < dataParagraphs.length; i++){
        // select the data point (the sentence)
        let data = dataParagraphs[i].textContent;
        // turn sentence into a list of words
        let dataList = data.split(" ");
        // set the prices
        let retail = parseInt(dataList[2]);
        let stockx = parseInt(dataList[3]);
        let goat = parseInt(dataList[4]);
        let stadium = parseInt(dataList[5]);
        let flight = parseInt(dataList[6]);
        // get the average of the prices (not including retail price)
        let avg = (stockx+goat+goat+stadium+flight)/4

        // get the date 
        let year = 0;
        let month = 0;
        let day = dataList[9];

        for (let j = 0; j < MONTHS.length; j++){
            if (dataList[8] === MONTHS[j]){
                month = j+1;
                if (dataList[10] === YEARS[0]){
                    year = YEARS[0];
                }else{
                    year = YEARS[1];
                }
    
            }
        }

        let date = month + "/" + day + "/" + year
        

        // add dictionary of data to list
        allData.push({
            "releaseDate": dataList[1],
            "retail": retail,
            "stockx": stockx,
            "goat": goat,
            "stadium": stadium,
            "flight": flight,
            "date": date,
            "average": avg,
        })

    }
    return 0;
}


