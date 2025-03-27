// open when someone clicks on the span element
function openNav() {
    document.getElementById("topRow").style.width = "100%";

    // if()
    
    document.getElementById("projectsLink").style.width = "100%";
    document.getElementById("aboutLink").style.width = "100%";
    document.getElementById("contactLink").style.width = "100%";
    document.getElementById("bottomRow").style.width = "100%";
}

// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
    document.getElementById("topRow").style.width = "0%";
    document.getElementById("projectsLink").style.width = "0%";
    document.getElementById("aboutLink").style.width = "0%";
    document.getElementById("contactLink").style.width = "0%";
    document.getElementById("bottomRow").style.width = "0%";
}