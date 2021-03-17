/**
 * This function takes checks the html and gets the data that was produced by the api.
 * @param none There are no parameters
 * @return {list} A list with useful data 
 */
 function getAndFormatData(){
    let data = document.querySelectorAll(".apiData");
    let usefulData = []
    data = data[0].textContent;
    data = JSON.parse(data)
    for (let i =0; i <data.length-1; i ++){
        let sneaker = data[i]
        usefulData.push({
            'name': sneaker.shoeName,
            'img': sneaker.thumbnail,
            'id': sneaker.styleID
        })
    }

    return usefulData;
}



/**
 * This function takes checks the html and gets the data that was produced by the api.
 * @param data A list containing dictionaries with sneaker info
 * @return {list} A list with useful data 
 */
function toHTml(data){
    console.log(data);

    html =   `
    <div class="row">

        <div id="colOne" class="col-lg-4">
            <div id="cheapSneakerOne" class="testimonial-item mx-auto mb-5 mb-lg-0">
                <img class="img-fluid mb-3" src="${data[0].img}">
                <h5> <a href="/sneakers/${data[0].id}/more"> ${data[0].name} </a></h5>
            </div>
        </div>

        <div id="colTwo" class="col-lg-4">
            <div id="cheapSneakerOne" class="testimonial-item mx-auto mb-5 mb-lg-0">
                <img class="img-fluid mb-3" src="${data[1].img}">
                <h5> <a href="/sneakers/${data[1].id}/more"> ${data[1].name} </a></h5>
            </div>
        </div>

        <div id="colThree" class="col-lg-4">
            <div id="cheapSneakerOne" class="testimonial-item mx-auto mb-5 mb-lg-0">
                <img class="img-fluid mb-3" src="${data[2].img}">
                <h5> <a href="/sneakers/${data[2].id}/more"> ${data[2].name} </a></h5>
            </div>
        </div>

  </div>
  `
  $('#popular').append(html)

    return 0;
}

let data = getAndFormatData()
toHTml(data)