let header_ids = "";
header_ids += '<img id="icon">';
header_ids += '<div class="spacer"></div>';
header_ids += '<div id="my_name">';
    header_ids += '<div id="name_a"></div>';
    header_ids += '<div id="name_b"></div>';
header_ids += '</div>';
header_ids += '<img id="open_menu" class="menu_btn">';

let overlay_html = "";
overlay_html += '<img id="close_menu" class="menu_btn">';

document.getElementById("header_bar").innerHTML += header_ids;
document.getElementById("overlay_menu").innerHTML += overlay_html + "\n";


import header from '/src/jsons/header_bar.json' with {type:"json"};

const cycle_ids = ["icon", "name_a", "name_b", "open_menu", "close_menu"];

for(let idNum = 0; idNum < cycle_ids.length; idNum++) {
    let element_id = cycle_ids[idNum];

    header.forEach((part) => {
        if(element_id == part.name) {
            let element = document.getElementById(element_id);

            if(element.nodeName == "DIV") {
                element.innerText = part.content;
            } else if(element.nodeName == "IMG") {
                element.src = part.image;
                element.alt = part.image_alt;
                element.onclick = part.on_click;
            }
        }
    })
};


import menu from '/src/jsons/overlay_menu.json' with {type:"json"};

// let overlay_html = "";
menu.forEach((tab) => {
    overlay_html = '<a id="' + tab.name + '" class="tab_btn" href="' + tab.redirect + '">' + tab.page + '</a>';
    document.getElementById("overlay_menu").innerHTML += overlay_html + "\n";
});

// open menu on click
function openNav() {
    // document.getElementById("projects_link").style.width = "100vw";
    // document.getElementById("about_link").style.width = "100vw";
    // document.getElementById("contact_link").style.width = "100vw";
    document.getElementById("projects_link").style.width = "100%";
    document.getElementById("about_link").style.width = "100%";
    document.getElementById("contact_link").style.width = "100%";
  
    // replace logo with x when nav is open
    let menuBox = document.getElementById("open_menu");
    menuBox.src = "/public/exit_menu.PNG";
    menuBox.style.visibility = "hidden";
    menuBox.style.zIndex = "-2";

    let closeBox = document.getElementById("close_menu");
    closeBox.style.visibility = "visible";
    closeBox.style.zIndex = "15";
    closeBox.alt = "close menu";
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
    menuBox.alt = "open menu";

}
  
document.getElementById("open_menu").addEventListener('click', openNav);
document.getElementById("close_menu").addEventListener('click', closeNav);

// let linkedin = document.getElementById("linkedin");
// linkedin.addEventListener("touchstart", (ev) => {
//     linkedin.style.color = rbg(142,58,89);
// })
// linkedin.addEventListener("touchend", (ev) => {
//     linkedin.style.color = rbg(0,49,83);
// })