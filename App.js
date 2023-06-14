const api_url = "https://isro.vercel.app/api/centres";

loadData();
let sortData = {};
async function getapi(url) {
  try {
    const response = await fetch(url);
    let data = await response.json();
    hideloader();
    return data;
  } catch (err) {
    document.getElementById("error").textContent =
      "check your internet connection!";
  }
}

async function loadData() {
  let data = await getapi(api_url);
  sortData = data.centres;
  dispalyData(data.centres);
}

function dispalyData(data) {
  let row = ``;
  for (let centre of data) {
    row += `<tr> 
        <td>${centre.id}</td>
        <td><span>CENTER</span>${centre.name} </td>
        <td><span>CITY</span>${centre.Place}</td>
        <td><span>STATE</span>${centre.State}</td>         
            </tr>`;
  }
  document.getElementById("list").innerHTML = row;
}

async function search() {
  let data = await getapi(api_url);
  let searchValue = document.getElementById("search").value;
  let list = [];
  if (searchValue == "") {
    sortData = data.centres;
    dispalyData(data.centres);
  }
  searchValue = searchValue.toUpperCase();
  for (let centre of data.centres) {
    if (
      centre.name.toUpperCase().indexOf(searchValue) > -1 ||
      centre.Place.toUpperCase().indexOf(searchValue) > -1 ||
      centre.State.toUpperCase().indexOf(searchValue) > -1
    ) {
      list.push(centre);
    }
  }
  sortData = list;
  dispalyData(list);
}
async function sort(filter) {
  console.log(sortData);
  let sortedDta = {};
  if (filter == "city") {
    sortedDta = sortData.sort((a, b) => (a.Place > b.Place ? 1 : -1));
  } else if (filter == "state") {
    sortedDta = sortData.sort((a, b) => (a.State > b.State ? 1 : -1));
  } else if (filter == "centre") {
    sortedDta = sortData.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  dispalyData(sortedDta);
}

function hideloader() {
  document.getElementById("loading").style.display = "none";
}
