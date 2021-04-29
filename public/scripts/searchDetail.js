/**
 * This function takes checks the html and gets the data that was produced by
 * the api.
 * @param none There are no parameters
 * @return list
 */
function getApiData() {
  let data = document.querySelectorAll('.apiData');
  const usefulData = [];
  data = data[0].textContent;
  data = JSON.parse(data);
  // add prices and sizes and where to buy
  usefulData.push(data.resellPrices, data.resellLinks, [data.shoeName, data.thumbnail]);
  return usefulData;
}


/**
 * This functions selects the top 3 most expensive and bottom 3 cheapest
 * sneakers from a list and loads them into html to display on the page.
 * @param list data that contains two lists inside with most expensive
 * and cheapest sneakers
 */
function loadSneakersToHtml(data) {
  // data = data[2]
  const name = data[2][0];
  const img = data[2][1];

  html = `
    <!-- name and img div -->
    <div class="name">
      <h3 class="sneakerName">${name} <h3>
      </div>

      <div class="img">
        <img class="sneakerImg" style="width:18rem;" src="${img}">
    </div>
  `;

  $('.searchSneakerInfo').append(html);

  return 0;
}


const data = getApiData();

loadSneakersToHtml(data);
