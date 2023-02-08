const api_url ="https://isro.vercel.app/api/centres";
showData();
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    if (response) {
        hideloader();
    }
    return data;
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

async function showData(){
    var data=await getapi(api_url);
    show(data.centres);
}
  
function show(data) {
    let row = 
        `<tr>
        <th>CENTRE</th>
        <th>CITY</th>
        <th>STATE</th>
       </tr>`;
    
    for (let centre of data) {
        row += `<tr> 
        <td>${centre.name} </td>
        <td>${centre.Place}</td>
        <td>${centre.State}</td>         
            </tr>`;
    }
    document.getElementById("list").innerHTML = row;
}

async function search(filter){
    var data=await getapi(api_url);
    var searchValue=document.getElementById("search").value;
    var list=[];
    if(filter=='city'){
        for (let centre of data.centres) {
            if(centre.Place.toUpperCase()==searchValue.toUpperCase()){
                list.push(centre);
            }
        }
    }
    else if(filter=='state'){
        for (let centre of data.centres) {
            if(centre.State.toUpperCase()==searchValue.toUpperCase()){
                list.push(centre);
            }
        }
    }
    else if(filter=='centre'){
        for (let centre of data.centres) {
            if(centre.name.toUpperCase()==searchValue.toUpperCase()){
                list.push(centre);
            }
        }
    }
    else{
        if(searchValue==""){
            show(data.centres);
        }
        searchValue = searchValue.toUpperCase();
        for (let centre of data.centres) {
            if(centre.name.toUpperCase().indexOf(searchValue)> -1 || centre.Place.toUpperCase().indexOf(searchValue)> -1 || centre.State.toUpperCase().indexOf(searchValue)> -1){
                list.push(centre);
            }
        }
    }
    show(list);
}

