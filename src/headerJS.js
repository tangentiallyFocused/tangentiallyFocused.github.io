// open when someone clicks on the span element
function openNav() {    
    document.getElementById("projects_link").style.width = "100vw";
    document.getElementById("about_link").style.width = "100vw";
    document.getElementById("contact_link").style.width = "100vw";
  
    // replace logo with x when nav is open
    let menuBox = document.getElementById("open_menu");
    menuBox.src = "/public/exit_menu.PNG";
    menuBox.style.visibility = "hidden";
    menuBox.style.zIndex = "-2";

    let closeBox = document.getElementById("close_menu");
    closeBox.style.visibility = "visible";
    closeBox.style.zIndex = "15";
    closeBox.alt = "close";
}
  
// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
    document.getElementById("projects_link").style.width = "0vw";
    document.getElementById("about_link").style.width = "0vw";
    document.getElementById("contact_link").style.width = "0vw";

    // replace logo with + when nav is closed
    let closeBox = document.getElementById("close_menu");
    closeBox.style.visibility = "hidden";


    let menuBox = document.getElementById("open_menu");
    menuBox.src = "/public/open_menu.PNG";
    menuBox.style.visibility = "visible";
    menuBox.style.zIndex = "0";
    menuBox.alt = "open";

}
  
document.getElementById("open_menu").addEventListener('click', openNav);
document.getElementById("close_menu").addEventListener('click', closeNav);


// keep??
let linkedin = document.getElementById("linkedin");
linkedin.addEventListener("touchstart", (ev) => {
    linkedin.style.color = rbg(142,58,89);
})
linkedin.addEventListener("touchend", (ev) => {
    linkedin.style.color = rbg(0,49,83);
})