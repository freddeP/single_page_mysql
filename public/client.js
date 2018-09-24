
window.addEventListener("DOMContentLoaded",initJs);



function initJs(){

    // lägg till lyssnare för menyknappar
    const menu = _arrClass("menu");
    menu.forEach(function(li){
        li.addEventListener("click",toggleContent);
    });

    const menuButton = document.getElementById("menuButton");
    menuButton.addEventListener("click", toggleMenu);


}


function toggleMenu(){

    // hämta första nav-elementet i vår html
    let nav = document.getElementsByTagName('nav')[0];
    nav.classList.toggle("hidden");


}

function toggleContent(){
  
    const menu = _arrClass("menu");

    // ta reda på vilket index vi klickade på.
    const index =  menu.indexOf(this);

    let content = _arrClass("mainContent");

    // gör alla osynliga
    content.forEach(function(el){
        el.className = "mainContent";
    });

    content[index].className += " visible";
}








// helpers
function _arrClass(c){
    return Array.from(document.getElementsByClassName(c));
}