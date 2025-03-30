// open when someone clicks on the span element
function openNav() {    
    document.getElementById("projectsLink").style.width = "100vw";
    document.getElementById("aboutLink").style.width = "100vw";
    document.getElementById("contactLink").style.width = "100vw";
  
    // replace logo with x when nav is open
    let logoBox = document.getElementById("icon");
    logoBox.src = "/public/exitMenu.PNG";
    logoBox.class = "closebtn";
    
    // logoBox.onclick = closeNav();
}
  
// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
    document.getElementById("projectsLink").style.width = "0vw";
    document.getElementById("aboutLink").style.width = "0vw";
    document.getElementById("contactLink").style.width = "0vw";
}
  
  
document.getElementById("icon").addEventListener('click', openNav);