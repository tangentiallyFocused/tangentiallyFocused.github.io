// open when someone clicks on the span element
function openNav() {    
    document.getElementById("projectsLink").style.width = "100vw";
    document.getElementById("aboutLink").style.width = "100vw";
    document.getElementById("contactLink").style.width = "100vw";
  
    // replace logo with x when nav is open
    let menuBox = document.getElementById("openMenu");
    menuBox.src = "/public/exitMenu.PNG";
    menuBox.style.visibility = "hidden";
    menuBox.style.zIndex = "-2";

    let closeBox = document.getElementById("closeMenu");
    closeBox.style.visibility = "visible";
    closeBox.style.zIndex = "15";
    closeBox.alt = "Multiplication symbol hand drawn in lemon yellow used to close the menu.";
}
  
// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
    document.getElementById("projectsLink").style.width = "0vw";
    document.getElementById("aboutLink").style.width = "0vw";
    document.getElementById("contactLink").style.width = "0vw";

    // replace logo with + when nav is closed
    let closeBox = document.getElementById("closeMenu");
    closeBox.style.visibility = "hidden";


    let menuBox = document.getElementById("openMenu");
    menuBox.src = "/public/openMenu.PNG";
    menuBox.style.visibility = "visible";
    menuBox.style.zIndex = "0";
    menuBox.alt = "Three horizontal line menu symbol hand drawn in prussian blue used to open the menu.";

}
  
  
document.getElementById("openMenu").addEventListener('click', openNav);
document.getElementById("closeMenu").addEventListener('click', closeNav);