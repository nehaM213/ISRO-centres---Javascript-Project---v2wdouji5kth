const api_url = "https://isro.vercel.app/api/centres";

showData();

async function getapi(url) {
  const response = await fetch(url);
  let data = await response.json();
  if (response) {
    hideloader();
  }
  return data;
}

function hideloader() {
  document.getElementById("loading").style.display = "none";
}

async function showData() {
  let data = await getapi(api_url);
  dispaly(data.centres);
}

function dispaly(data) {
  let row = ``;
  for (let centre of data) {
    row += `<tr> 
        <td><span>CENTER</span>${centre.name} </td>
        <td><span>CITY</span>${centre.Place}</td>
        <td><span>STATE</span>${centre.State}</td>         
            </tr>`;
  }
  document.getElementById("list").innerHTML = row;
}

async function search(filter) {
  let data = await getapi(api_url);
  let searchValue = document.getElementById("search").value;
  let list = [];
  if (filter == "city") {
    for (let centre of data.centres) {
      if (centre.Place.toUpperCase() == searchValue.toUpperCase()) {
        list.push(centre);
      }
    }
  } else if (filter == "state") {
    for (let centre of data.centres) {
      if (centre.State.toUpperCase() == searchValue.toUpperCase()) {
        list.push(centre);
      }
    }
  } else if (filter == "centre") {
    for (let centre of data.centres) {
      if (centre.name.toUpperCase() == searchValue.toUpperCase()) {
        list.push(centre);
      }
    }
  } else {
    if (searchValue == "") {
      dispaly(data.centres);
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
  }
  dispaly(list);
}
