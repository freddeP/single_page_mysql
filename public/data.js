
window.addEventListener("DOMContentLoaded", initServerContent);

function initServerContent(){
    // hämta alla poster i todo
    getAllTodos();
}

function getAllTodos(){

    fetch('/getAllTodos')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      
        updateDom(myJson);

    });
}



function updateDom(content)
{
    let revContent = content.reverse();

    revContent.forEach(element => {
        
  
    let template = `
    <h2>${element.date.split("T")[0]}</h2>
    <p> 
        ${element.post}  
    </p>`;
    
    let newContainer = document.createElement('div');
    newContainer.className = "todoContent";
    newContainer.innerHTML = template;


    document.getElementById("allPosts").appendChild(newContainer);
    });
}

