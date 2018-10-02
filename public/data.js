
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
        updateTodos(myJson);
    });
}



function updateTodos(content)
{
    console.log(content);
    let revContent = content.reverse();
    revContent.forEach(element => {
        
    let template = `
        <h2>${element.date.split("T")[0]}</h2>
        <h2 id = "author${element.id}">${element.author}</h2>
        <p id = "post${element.id}"> 
            ${element.post}  
        </p>
        <a href = '/deletePost?id=${element.id}'>delete this</a>`;
    

    let newContainer = document.createElement('div');
    newContainer.className = "todoContent";
    newContainer.innerHTML = template;

    let updateButton = document.createElement('button');
    updateButton.id = "_"+element.id;
    updateButton.innerHTML = "update this post";
    updateButton.addEventListener("click", initUpdate);
    newContainer.appendChild(updateButton);

    document.getElementById("allPosts").appendChild(newContainer);
    });
}



function initUpdate()
{
  let updateDiv =  document.getElementsByClassName("update")[0];
  updateDiv.className = "update";
  console.log(this);
  const id = this.id.split("_")[1];
  const authurId = "author"+id;
  const postId = "post"+id;
  const author = document.getElementById(authurId);
  const post = document.getElementById(postId);
  document.getElementById("id").value = id;

  document.getElementById("author").value = author.innerHTML;
  document.getElementById("todo").value = post.innerHTML;
 
  window.scrollTo(0,0);
}